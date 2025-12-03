export default {
  async fetch(request, env) {
    const { userId, message } = await request.json();

    // Load previous conversation from Durable Object
    const id = env.MEMORY.idFromName(userId);
    const obj = env.MEMORY.get(id);
    const previous = await obj.fetch("/get").then(r => r.json());

    // Call AI
    const aiResponse = await env.AI.chat({
      model: "llama-3.3",
      messages: [
        { role: "system", content: "You are a helpful travel assistant." },
        ...previous,
        { role: "user", content: message }
      ]
    });

    // Save response to memory
    await obj.fetch("/save", {
      method: "POST",
      body: JSON.stringify({ role: "assistant", content: aiResponse.content })
    });

    return new Response(JSON.stringify({ reply: aiResponse.content }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
