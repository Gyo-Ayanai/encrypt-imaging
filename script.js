function encrypt() {
  const text = document.getElementById("inputText").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  const size = 6; // 6マスで1文字
  const block = 20; // 1マスのピクセルサイズ
  canvas.width = text.length * (size * block);
  canvas.height = block;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) % 64; // 簡易変換
    const bits = code.toString(2).padStart(6, "0");
    const colors = ["red","red","blue","blue","green","green"];

    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = bits[j] === "1" ? "black" : colors[j];
      ctx.fillRect(i * size * block + j * block, 0, block, block);
    }
  }
}
