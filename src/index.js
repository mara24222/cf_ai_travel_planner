export default {
  async fetch(request, env) {
    // Get a Durable Object ID
    const id = env.MEMORY.idFromName("session1"); // session1 is a unique key
    const obj = env.MEMORY.get(id);

    if (request.method === "POST") {
      // Forward user input to the Durable Object
      return await obj.fetch(request);
    } else {
      // Get chat history from Durable Object
      return await obj.fetch(request);
    }
  }
};

