// path: api/analyze.js
export default async function handler(req, res) {
  // CORS（最初は * でOK。公開後は自分のドメインに絞る）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // 受け取ったJSON（今回は未使用）
  const chunks = []; for await (const ch of req) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString() || '{}';
  let input = {}; try { input = JSON.parse(raw); } catch (_) {}

  // UIが期待する形のダミー結果
  const result = {
    categories:["共感力","質問力","話題展開","柔軟性","テンポ"],
    scores:[4.2,3.6,4.1,3.2,4.4],
    comments:{ "共感力":"要約＋感情ラベリングが自然。" },
    freeSummary:"“安心して話せる人”。Why質問1発・言い換え→質問・軽い提案で伸びる。",
    myMBTI:"INFP", myMbtiLongText:"…", partnerMBTI:"ENFJ",
    compatibilityText:"理想と配慮が融合。",
    compatibilityAxes:["価値観整合","会話の相性","感情共有","未来志向","距離感調整"],
    compatibilityScores:[4.5,3.8,4.2,4.0,3.9],
    compatibilityReasons:{},
    detailedAdvice:{},
    partnerProfile:{
      greenLines:["感情の言語化"], redLines:["放置の連続"],
      goodPhrases:["「きっかけは何かあった？」"], badPhrases:["「普通はさ…」"],
      contactStyle:"短いやり取りの継続で安心感。", dateTips:"写真映え＋静けさ。",
      conflictPattern:"配慮不足の一言で発火。", reconcileTips:"事実→意図→感情→今後。", progression:"次の提案で小さく前進。"
    }
  };
  res.status(200).json({ result });
}
