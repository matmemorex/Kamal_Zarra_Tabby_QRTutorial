import POVTutorial from '@/components/tutorial/POVTutorial';

const tutorialSteps = [
  {
    title: 'Scan QR Code',
    icon: '📱',
    text: 'Mulakan dengan mengimbas kod QR pada produk Tabby anda. Setiap produk mempunyai kod unik yang membolehkan anda mendaftar dan mendapat points!',
    details: [
      'Buka kamera telefon anda',
      'Arahkan ke kod QR pada tag produk',
      'Klik pautan yang muncul',
    ],
    povComponent: (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Selamat Datang!</h1>
          <p className="text-white/90">Tabby Loyalty</p>
        </div>
        <div className="bg-white rounded-2xl p-4 mb-4 w-full">
          <div className="bg-gradient-to-br from-beige-100 to-beige-200 rounded-xl p-4 mb-3">
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-black rounded"
                  style={{
                    opacity: i % 3 === 1 && Math.floor(i / 3) === 1 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm font-semibold">QR Code</p>
        </div>
        <button className="w-full bg-gradient-to-r from-beige-500 to-beige-700 text-white py-3 rounded-xl font-semibold text-sm">
          Daftar dengan Nombor Telefon
        </button>
      </div>
    ),
  },
  {
    title: 'Enter Phone Number',
    icon: '📞',
    text: 'Masukkan nombor telefon Malaysia anda. Kami akan menghantar kod OTP melalui WhatsApp untuk pengesahan yang selamat.',
    details: [
      'Format: 012-3456789',
      'OTP akan dihantar melalui WhatsApp',
      'Kod sah untuk 5 minit',
    ],
    povComponent: (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">📱</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Masukkan Nombor Telefon
            </h2>
            <p className="text-gray-600 text-sm">
              Kami akan menghantar kod OTP melalui WhatsApp
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="bg-gradient-to-br from-beige-500 to-beige-700 text-white px-3 py-3 rounded-xl font-bold text-base flex items-center justify-center min-w-[70px]">
                +60
              </div>
              <div className="flex-1 px-3 py-3 border-2 border-beige-300 rounded-xl bg-gray-50 text-sm">
                <span data-phone-text className="text-gray-400"></span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-beige-500 to-beige-700 text-white py-3 rounded-xl font-semibold text-sm">
              Hantar OTP
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Verify OTP',
    icon: '🔐',
    text: 'Masukkan kod 6-digit yang diterima melalui WhatsApp. Kod ini akan tamat dalam 5 minit untuk keselamatan anda.',
    details: [
      '6 digit kod OTP',
      'Diterima melalui WhatsApp',
      'Sah selama 5 minit',
    ],
    povComponent: (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sahkan Kod OTP
            </h2>
            <p className="text-gray-600 text-sm">
              Kod telah dihantar ke WhatsApp anda
            </p>
            <p className="text-sm text-beige-700 font-semibold mt-2">012-3456789</p>
          </div>
          
          {/* WhatsApp Message */}
          <div className="mb-4 bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💬</div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">WhatsApp</p>
                <p className="text-sm text-gray-700">
                  Kod OTP anda: <span id="otpText" className="font-mono font-bold text-beige-700">------</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                id={`d${num}`}
                data-otp-box={num}
                className="w-12 h-14 border-2 border-beige-300 rounded-xl flex items-center justify-center text-xl font-bold bg-beige-50 transition-all"
              >
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mb-4">
            Kod akan tamat dalam: <span className="font-semibold text-beige-700">4:32</span>
          </p>
          <button className="text-beige-700 hover:text-beige-800 font-semibold text-sm w-full text-center">
            Hantar semula OTP
          </button>
        </div>
      </div>
    ),
  },
  {
    title: 'Earn Points',
    icon: '⭐',
    text: 'Selepas pendaftaran berjaya, anda akan mendapat points serta-merta! Kumpul lebih banyak points untuk menebus hadiah istimewa.',
    details: [
      '50 points untuk setiap produk',
      '25 points bonus lengkapkan profil',
      '100 points untuk referral',
    ],
    povComponent: (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
          <div className="text-5xl mb-4">⭐</div>
          <div className="text-4xl font-bold text-beige-700 mb-2">+50</div>
          <p className="text-gray-600 font-semibold mb-6">Points Earned!</p>
          <div className="bg-beige-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Total Points</p>
            <p className="text-3xl font-bold text-beige-700">50</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Digital Wardrobe',
    icon: '👗',
    text: 'Semua produk Tabby yang anda daftarkan akan disimpan dalam Digital Wardrobe anda. Pantau waranti dan koleksi tudung anda dengan mudah!',
    details: [
      'Semua produk di satu tempat',
      'Waranti digital automatik',
      'Sejarah pembelian',
    ],
    povComponent: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <div className="bg-white/10 backdrop-blur-lg text-white p-4 mb-4 rounded-2xl">
          <h2 className="text-xl font-bold mb-1">Digital Wardrobe</h2>
          <p className="text-sm opacity-90">3 Produk</p>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl p-3 aspect-square flex flex-col items-center justify-center shadow-lg"
            >
              <div className="text-3xl mb-2">👗</div>
              <p className="text-xs text-gray-600 text-center">Bawal Satin</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Lucky Draw',
    icon: '🎲',
    text: 'Setiap pendaftaran produk memberi anda entry untuk Lucky Draw! Lengkapkan profil untuk lebih banyak entry dan peluang menang!',
    details: [
      '1 entry setiap produk',
      '3 entries bonus lengkapkan profil',
      'Hadiah menarik setiap bulan',
    ],
    povComponent: (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🎲</div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lucky Draw Aktif</h2>
          <div className="bg-gradient-to-r from-beige-400 to-beige-600 rounded-xl p-5 text-white mb-4">
            <p className="text-sm opacity-90 mb-1">Entri anda</p>
            <p className="text-3xl font-bold">7</p>
            <p className="text-xs opacity-75 mt-2">15,420 total entries</p>
          </div>
          <p className="text-gray-600 text-sm">Sertai sekarang!</p>
        </div>
      </div>
    ),
  },
];

export default function TutorialPage() {
  return (
    <div className="min-h-screen">
      <POVTutorial steps={tutorialSteps} />
    </div>
  );
}

