// Vercel Serverless Function: POST /api/analyze
export default async function handler(req, res) {
  // --- CORS（最初は * でOK。後で自分のドメインに絞ってください）---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' }); return;
  }

  // リクエストJSONを読む
  const chunks = []; for await (const ch of req) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString() || '{}';
  let input = {}; try { input = JSON.parse(raw); } catch (_) {}

  // UIが期待する形のダミー結果（まずは動くURLを作る）
  const result = {
    categories: ["共感力","質問力","話題展開","柔軟性","テンポ"],
    scores: [4.2,3.6,4.1,3.2,4.4],
    comments: {
      "共感力":"要約＋感情ラベリングが自然。",
      "質問力":"Why/Howを1発足すだけで深くなる。",
      "話題展開":"自己開示→橋渡しが上手。",
      "柔軟性":"文量合わせでさらに柔らかく。",
      "テンポ":"読みやすいテンポ。"
    },
    freeSummary:"“安心して話せる人”。Why質問1発・言い換え→質問・軽い提案で伸びる。",
    myMBTI:"INFP",
    myMbtiLongText:"価値観重視・言葉丁寧。短いリアクション→後から返信が合う。",
    partnerMBTI:"ENFJ",
    compatibilityText:"理想と配慮が融合。小さな本音共有で強み最大化。",
    compatibilityAxes:["価値観整合","会話の相性","感情共有","未来志向","距離感調整"],
    compatibilityScores:[4.5,3.8,4.2,4.0,3.9],
    compatibilityReasons:{
      "価値観整合":"理念×調和で協力関係◎",
      "会話の相性":"主導が移りやすいが熱量は噛み合う",
      "感情共有":"安心安全の空気を大事にできる",
      "未来志向":"意味と実装力で動きやすい",
      "距離感調整":"希望の伝え合いが調整弁"
    },
    detailedAdvice:{ "共感力":[
      {action:"要約＋感情ラベリング",effect:"伝わり感UP",example:"「それ不安も強かったよね」"}
    ]},
    partnerProfile:{
      greenLines:["感情の言語化","具体的称賛","一緒に体験"],
      redLines:["放置の連続","皮肉の強い冗談"],
      goodPhrases:["「きっかけは何かあった？」"],
      badPhrases:["「普通はさ…」"],
      contactStyle:"短いやり取りの継続で安心感。",
      dateTips:"写真映え＋静けさ。60〜90分設計。",
      conflictPattern:"配慮不足の一言で発火しやすい。",
      reconcileTips:"事実→意図→感情→今後で短く。",
      progression:"“次は○○しよう”で小さく前進。"
    }
  };

  res.status(200).setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify({ result }));
}
