import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || 'dummy-key-to-bypass-build',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

export async function POST(request: Request) {
  try {
    const { itemName, weight } = await request.json();

    if (!process.env.NVIDIA_API_KEY) {
      // Mock the response if there's no API key (for testing/presentation)
      const mockResult = {
        materialType: "Sampah " + itemName,
        estimatedValue: 25000,
        co2Saved: 3.5,
        craftIdea: "Kerajinan Daur Ulang " + itemName,
        craftDescription: "Produk inovatif yang ramah lingkungan, dibuat dari " + weight + "kg " + itemName + ". Sangat cocok untuk dekorasi rumah minimalis dan mengurangi jejak karbon.",
        craftDifficulty: "Sedang",
        craftMarketValue: 45000,
        toolsNeeded: ["Gunting", "Lem Super", "Cat Akrilik", "Kuas"],
        funFact: "Mendaur ulang sampah " + itemName + " dapat menyelamatkan energi dan mengurangi polusi hingga 50%!"
      };
      return NextResponse.json({ result: mockResult });
    }

    const response = await openai.chat.completions.create({
      model: 'meta/llama-3.1-8b-instruct', 
      messages: [
        {
          role: 'system',
          content: 'Anda adalah ahli kerajinan tangan kreatif (handicraft) dari barang bekas. Fokus pada ide produk kerajinan yang memiliki nilai jual tinggi.'
        },
        {
          role: 'user',
          content: `Saya punya sampah berikut:
          Nama: ${itemName}
          Berat: ${weight} kg

          Berdasarkan jenis dan jumlah (berat) sampah tersebut, berikan ide produk kerajinan tangan kreatif yang bisa dibuat. 
          Sesuaikan skala produk dengan berat sampah yang tersedia.

          Berikan informasi berikut dalam format JSON:
          {
            "materialType": "Kategori material sampah",
            "estimatedValue": 15000, 
            "co2Saved": 2.5,
            "craftIdea": "Nama ide produk kerajinan",
            "craftDescription": "Penjelasan detail produk kerajinan dan mengapa cocok dengan jumlah sampah tersebut",
            "craftDifficulty": "Tingkat kesulitan (Mudah/Sedang/Sulit)",
            "craftMarketValue": "Estimasi harga jual produk kerajinan jadi (dalam Rupiah)",
            "toolsNeeded": ["alat 1", "alat 2"],
            "funFact": "Fakta unik tentang material ini"
          }`
        },
      ],
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal', details: error.message }, { status: 500 });
  }
}
