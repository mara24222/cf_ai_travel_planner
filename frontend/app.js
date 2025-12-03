const chatDiv = document.getElementById("chat");
const input = document.getElementById("input");

document.getElementById("send").onclick = async () => {
  const msg = input.value;
  chatDiv.innerHTML += `<div>User: ${msg}</div>`;
  
  const res = await fetch("/api/plan", {
    method: "POST",
    body: JSON.stringify({ userId: "user1", message: msg }),
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.json();
  chatDiv.innerHTML += `<div>AI: ${data.reply}</div>`;
  input.value = "";
};
