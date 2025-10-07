const hiraList = ["", "あ","い","う","え","お","か","き","く","け","こ",
"さ","し","す","せ","そ","た","ち","つ","て","と",
"な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
"ま","み","む","め","も","や","ゆ","よ",
"ら","り","る","れ","ろ","わ","を","ん","゛","゜"];

function encrypt() {
  const text = document.getElementById("inputText").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const size = 6;      // 6マスで1文字
  const block = 10;    // 1マスのピクセルサイズ
  const len = text.length;

  // --- ✅ 正方形サイズ計算 ---
  const grid = Math.ceil(Math.sqrt(len)); // 最小の正方形
  const total = grid * grid; // 余白分も含めた文字数

  canvas.width = grid * (size * block);
  canvas.height = grid * (block * 1);

  // 文字1行ごとに「block × 1」の高さしかなかった → block × 1 ではなく「block × 1行ぶん」
  canvas.height = grid * block; // ✅ 各行がblockの高さで1マスずつ下にずれる

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    let char = text[i] || ""; // 余った部分は空白
    const index = hiraList.indexOf(char);
    const num = index === -1 ? 0 : index; // 未登録は0扱い

    // --- ✅ 10進→2進（6ビット固定） ---
    const bits = num.toString(2).padStart(6, "0");
    const colors = ["red", "red", "blue", "blue", "green", "green"];

    // --- ブロック位置を計算 ---
    const row = Math.floor(i / grid);
    const col = i % grid;

    for (let j = 0; j < 6; j++) {
      const x = col * (size * block) + j * block;
      const y = row * block;
      ctx.fillStyle = bits[j] === "1" ? "black" : colors[j];
      ctx.fillRect(x, y, block, block);
    }
  }
}


