const api = {
  getChapter: (bookId: string, chapterId: string) => `/api/v1/chapter/${bookId}/${chapterId}`,
};

export default api;
