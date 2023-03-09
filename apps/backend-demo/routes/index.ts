// eslint-disable-next-line @typescript-eslint/require-await
export default defineEventHandler(async () => {
  return {
    data: {
      status: 'OK',
    },
  };
});
