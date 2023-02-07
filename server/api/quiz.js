export default defineEventHandler(async (event) => {
  // api call with private key
  const { api_url } = useRuntimeConfig();
  const { data } = await $fetch(`${api_url}/quiz`);

  return data;
});
