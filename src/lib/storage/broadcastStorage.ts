import type { PersistStorage, StorageValue } from "zustand/middleware";

/**
 * BroadcastChannel을 사용한 탭 간 동기화 스토리지
 */
export function createBroadcastStorage<S>(
  name: string,
): PersistStorage<S> | undefined {
  // 서버 사이드에서는 undefined 반환
  if (typeof window === "undefined") {
    return undefined;
  }

  const channelName = `${name}-sync`;
  let channel: BroadcastChannel | null = null;

  // BroadcastChannel 지원 확인
  if ("BroadcastChannel" in window) {
    channel = new BroadcastChannel(channelName);

    // 다른 탭에서 변경사항이 있을 때 storage 이벤트 발생
    channel.onmessage = (event) => {
      if (event.data.type === "storage-update") {
        // storage 이벤트를 수동으로 발생시켜 Zustand가 재동기화하도록 함
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: name,
            newValue: event.data.value,
            storageArea: localStorage,
          }),
        );
      }
    };
  }

  return {
    getItem: (key: string): StorageValue<S> | null => {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as StorageValue<S>) : null;
    },
    setItem: (key: string, value: StorageValue<S>): void => {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);

      // 다른 탭에 변경사항 전파
      if (channel) {
        channel.postMessage({
          type: "storage-update",
          value: stringValue,
        });
      }
    },
    removeItem: (key: string): void => {
      localStorage.removeItem(key);

      // 다른 탭에 삭제 전파
      if (channel) {
        channel.postMessage({
          type: "storage-update",
          value: null,
        });
      }
    },
  };
}
