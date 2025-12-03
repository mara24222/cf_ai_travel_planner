export class MemoryDO {
  constructor(state) {
    this.state = state;
  }

  async fetch(req) {
    if (req.method === "POST") {
      const data = await req.json();
      let history = (await this.state.storage.get("history")) || [];
      history.push(data);
      await this.state.storage.put("history", history);
      return new Response("Saved");
    } else {
      const history = (await this.state.storage.get("history")) || [];
      return new Response(JSON.stringify(history), { headers: { "Content-Type": "application/json" } });
    }
  }
}
