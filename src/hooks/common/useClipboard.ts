function useClipboard() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        alert("성공적으로 복사되었습니다");
      }).catch(() => {
        alert("복사 과정에서 문제가 발생했습니다.\n이후 다시 시도해주세요");
      });
  }

  return {copyToClipboard};
}

export default useClipboard;