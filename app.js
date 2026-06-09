// マスタデータ
const creditCards = [
    { id: 'rakuten', name: '楽天カード', color: 'text-red-500' },
    { id: 'smbc_nl', name: '三井住友(NL)', color: 'text-green-600' },
    { id: 'smbc_gold', name: '三井住友(G)', color: 'text-yellow-500' },
    { id: 'epos_gold', name: 'エポスゴールド', color: 'text-red-400' },
    { id: 'paypay_card', name: 'PayPayカード', color: 'text-red-500' },
    { id: 'recruit', name: 'リクルートカード', color: 'text-blue-500' },
    { id: 'dcard_gold', name: 'dカード GOLD', color: 'text-yellow-600' },
    { id: 'amazon_master', name: 'Amazon(M)', color: 'text-gray-800' },
    { id: 'aeon_card', name: 'イオンカード', color: 'text-purple-600' }
];

const digitalWallets = [
    { id: 'paypay', name: 'PayPay', color: 'text-red-500' },
    { id: 'rakuten_pay', name: '楽天ペイ', color: 'text-red-600' },
    { id: 'au_pay', name: 'au PAY', color: 'text-orange-500' },
    { id: 'd_barai', name: 'd払い', color: 'text-red-500' },
    { id: 'mobile_suica', name: 'モバイルSuica', color: 'text-green-500' },
    { id: 'waon', name: 'WAON', color: 'text-blue-400' },
    { id: 'famipay', name: 'ファミペイ', color: 'text-green-600' }
];

// 高還元・複雑ルートの設定
// 実際には細かいルールや上限がありますが、MVPとして代表的な還元率を採用
const routeData = [
    {
        cardId: 'smbc_gold', walletId: 'mobile_suica', rate: 3.0,
        path: [
            { name: '三井住友(G)', note: '基本+100万修行', rate: 1.5 },
            { name: 'Kyash', note: 'チャージ', rate: 0.2 },
            { name: 'ANA Pay', note: 'チャージ', rate: 0.5 },
            { name: 'TOYOTA Wallet', note: 'チャージ', rate: 1.0 },
            { name: 'モバイルSuica', note: '決済', rate: 0 }
        ],
        recommend: 'smbc_gold' // 自分が持っているから特にレコメンドしなくていい場合はnullにできるが、ここでは表示する例
    },
    {
        cardId: 'epos_gold', walletId: 'mobile_suica', rate: 2.5,
        path: [
            { name: 'エポスゴールド', note: '選べるPアップ+修行', rate: 1.5 },
            { name: 'モバイルSuica', note: '直接チャージ等', rate: 1.0 }
        ],
        recommend: 'epos_gold'
    },
    {
        cardId: 'epos_gold', walletId: 'rakuten_pay', rate: 2.5,
        path: [
            { name: 'エポスゴールド', note: '基本+修行', rate: 1.5 },
            { name: 'au PAY', note: 'チャージ', rate: 0 },
            { name: 'WAON', note: 'Apple Pay経由', rate: 1.0 },
            { name: '楽天POSA購入', note: 'ミニストップ等', rate: 0 },
            { name: '楽天ペイ', note: '決済', rate: 0 } 
        ],
        recommend: 'rakuten_premium'
    },
    {
        cardId: 'rakuten', walletId: 'rakuten_pay', rate: 1.5,
        path: [
            { name: '楽天カード', note: 'チャージ', rate: 0.5 },
            { name: '楽天キャッシュ', note: '経由', rate: 0 },
            { name: '楽天ペイ', note: '決済', rate: 1.0 }
        ],
        recommend: 'rakuten_premium'
    },
    {
        cardId: 'paypay_card', walletId: 'paypay', rate: 1.5,
        path: [
            { name: 'PayPayカード', note: 'クレジット', rate: 1.0 },
            { name: 'PayPay', note: '決済(ステップ等)', rate: 0.5 }
        ],
        recommend: 'paypay_gold'
    },
    {
        cardId: 'dcard_gold', walletId: 'd_barai', rate: 1.0,
        path: [
            { name: 'dカード GOLD', note: '紐付け', rate: 0.5 },
            { name: 'd払い', note: '決済', rate: 0.5 }
        ],
        recommend: 'dcard_gold'
    },
    {
        cardId: 'aeon_card', walletId: 'waon', rate: 1.0,
        path: [
            { name: 'イオンカード', note: 'チャージ', rate: 0.5 },
            { name: 'WAON', note: '決済', rate: 0.5 }
        ],
        recommend: 'aeon_gold'
    },
    {
        cardId: 'recruit', walletId: 'd_barai', rate: 1.7,
        path: [
            { name: 'リクルートカード', note: '紐付け', rate: 1.2 },
            { name: 'd払い', note: '決済', rate: 0.5 }
        ],
        recommend: 'dcard_gold'
    },
    {
        cardId: 'amazon_master', walletId: 'paypay', rate: 1.0,
        path: [
            { name: 'Amazon(M)', note: '紐付け', rate: 1.0 },
            { name: 'PayPay', note: '決済', rate: 0 }
        ],
        recommend: 'amazon_prime'
    }
];

// レコメンドカード（広告）のマスタデータ
const recommendCards = {
    'smbc_gold': {
        name: '三井住友カード ゴールド（NL）',
        note: '年間100万円利用で年会費永年無料＆1万pt還元。コンビニ・飲食店で最大7%還元！',
        url: '#'
    },
    'epos_gold': {
        name: 'エポスゴールドカード',
        note: '選べるポイントアップショップでポイント3倍！モバイルSuicaも対象にできます。',
        url: '#'
    },
    'rakuten_premium': {
        name: '楽天プレミアムカード',
        note: '楽天経済圏の最強カード！楽天市場でポイント最大+4倍、空港ラウンジも無料で使えます。',
        url: '#'
    },
    'paypay_gold': {
        name: 'PayPayカード ゴールド',
        note: 'ソフトバンク・ワイモバイルユーザーなら通信料で最大10%還元！PayPay決済も常時お得に。',
        url: '#'
    },
    'dcard_gold': {
        name: 'dカード GOLD',
        note: 'ドコモのケータイ・ドコモ光の利用料金の10%が還元！d払いとの相性も抜群です。',
        url: '#'
    },
    'aeon_gold': {
        name: 'イオンゴールドカード',
        note: 'インビテーション限定！年会費無料でイオンラウンジが利用可能に。',
        url: '#'
    },
    'amazon_prime': {
        name: 'Amazon Prime Mastercard',
        note: 'プライム会員ならAmazonでの買い物が常に2%還元！主要コンビニでも1.5%還元。',
        url: '#'
    },
    'default': {
        name: '三井住友カード ゴールド（NL）',
        note: '迷ったらこれ！年間100万円利用で年会費永年無料＆1万pt還元。',
        url: '#'
    }
};

// 選択状態
let selectedCards = new Set();
let selectedWallets = new Set();
let selectedFurusato = null;

function init() {
    renderCheckboxes('credit-cards', creditCards, selectedCards);
    renderCheckboxes('digital-wallets', digitalWallets, selectedWallets);
    document.getElementById('calculate-btn').addEventListener('click', calculateBestRoute);
    
    // ふるさと納税用
    renderFurusatoRadio();
}

function renderCheckboxes(containerId, items, selectedSet) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => {
        const isSelected = selectedSet.has(item.id);
        const iconClass = containerId === 'credit-cards' ? 'fa-credit-card' : 'fa-mobile-alt';
        
        return `
        <label class="relative flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-amber-500 bg-slate-900 shadow-md transform -translate-y-0.5' : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 shadow-sm'}">
            <input type="checkbox" value="${item.id}" class="absolute opacity-0 w-0 h-0" ${isSelected ? 'checked' : ''}>
            <div class="absolute top-2 right-2 ${isSelected ? 'text-amber-500' : 'text-transparent'}">
                <i class="fas fa-check-circle text-lg"></i>
            </div>
            <i class="fas ${iconClass} text-2xl mb-2 ${isSelected ? 'text-amber-500' : (item.color || 'text-slate-400')}"></i>
            <span class="text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-700'} text-center leading-tight">${item.name}</span>
        </label>
        `;
    }).join('');

    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedSet.add(e.target.value);
            } else {
                selectedSet.delete(e.target.value);
            }
            renderCheckboxes(containerId, items, selectedSet);
        });
    });
}

function calculateBestRoute() {
    if (selectedCards.size === 0 || selectedWallets.size === 0) {
        alert('カードと決済方法をそれぞれ1つ以上選択してください。');
        return;
    }

    let bestRate = -1;
    let bestRoutePath = null;
    let bestRecommendId = 'default';

    selectedCards.forEach(cardId => {
        selectedWallets.forEach(walletId => {
            // 定義済みルートを検索
            const route = routeData.find(r => r.cardId === cardId && r.walletId === walletId);
            
            if (route) {
                if (route.rate > bestRate) {
                    bestRate = route.rate;
                    bestRoutePath = route.path;
                    bestRecommendId = route.recommend || 'default';
                }
            } else {
                // 定義がない場合の汎用ルート（還元率0.5%として扱う）
                const fallbackRate = 0.5;
                if (fallbackRate > bestRate) {
                    bestRate = fallbackRate;
                    const card = creditCards.find(c => c.id === cardId);
                    const wallet = digitalWallets.find(w => w.id === walletId);
                    bestRoutePath = [
                        { name: card.name, note: '直接チャージ等', rate: 0.5 },
                        { name: wallet.name, note: '決済', rate: 0 }
                    ];
                    // 汎用ルートの場合はそのカードに応じたデフォルトレコメンドにするなど工夫可能だが、ここではdefaultとする
                    bestRecommendId = 'default';
                }
            }
        });
    });

    displayResult(bestRoutePath, bestRate, bestRecommendId);
}

function displayResult(path, rate, recommendId) {
    const resultArea = document.getElementById('result-area');
    const routeContainer = document.getElementById('route-container');
    const resultRate = document.getElementById('result-rate');
    
    // おすすめカード要素
    const recName = document.getElementById('recommend-card-name');
    const recNote = document.getElementById('recommend-card-note');
    const recLink = document.getElementById('recommend-card-link');

    routeContainer.innerHTML = '';

    path.forEach((step, index) => {
        // ステップの描画
        const stepDiv = document.createElement('div');
        stepDiv.className = 'bg-slate-800 p-3 md:p-4 rounded-lg shadow-md text-center border-t-4 border-amber-500 flex-1 min-w-[120px] max-w-[180px] w-full relative z-10';
        
        stepDiv.innerHTML = `
            <p class="text-xs text-slate-400 mb-1">${step.note}</p>
            <p class="font-bold text-sm md:text-base text-white leading-tight">${step.name}</p>
            <p class="text-xs text-amber-500 font-bold mt-1">+${step.rate.toFixed(1)}%</p>
        `;
        routeContainer.appendChild(stepDiv);

        // 矢印の描画 (最後以外)
        if (index < path.length - 1) {
            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'text-slate-500 mx-1 flex flex-col justify-center';
            arrowDiv.innerHTML = '<i class="fas fa-arrow-down md:fa-arrow-right text-xl md:text-2xl"></i>';
            routeContainer.appendChild(arrowDiv);
        }
    });

    resultRate.textContent = rate.toFixed(1);

    // レコメンドカードの反映
    const recData = recommendCards[recommendId] || recommendCards['default'];
    recName.textContent = recData.name;
    recNote.textContent = recData.note;
    recLink.href = recData.url;

    resultArea.classList.remove('hidden');
    // 再生のためのアニメーションリセット
    resultArea.classList.remove('animate-fade-in');
    void resultArea.offsetWidth;
    resultArea.classList.add('animate-fade-in');
}

// --- ふるさと納税機能 ---
const furusatoEcSites = [
    { id: 'rakuten_furusato', name: '楽天ふるさと納税', icon: 'fa-shopping-cart', color: 'text-red-500' },
    { id: 'yahoo_furusato', name: 'さとふる(Yahoo!)', icon: 'fa-yahoo', color: 'text-red-600' },
    { id: 'au_furusato', name: 'au PAY ふるさと納税', icon: 'fa-store', color: 'text-orange-500' },
    { id: 'furunavi', name: 'ふるなび等 (独自Pt)', icon: 'fa-gift', color: 'text-blue-500' }
];

const furusatoRules = {
    'rakuten_furusato': {
        date: 'お買い物マラソン ＋ 5と0のつく日',
        note: '楽天カード利用で基本還元＋複数ショップ買い回りで最大還元率が10%以上狙えます。上限に注意！',
        url: '#'
    },
    'yahoo_furusato': {
        date: '5のつく日 または ゾロ目の日',
        note: 'PayPay支払いで高還元。超PayPay祭や肉の日などのキャンペーン日も要チェックです。',
        url: '#'
    },
    'au_furusato': {
        date: '三太郎の日（毎月3, 13, 23日）',
        note: 'auスマートパスプレミアム会員ならさらに還元率アップ。ポイント交換所での増量キャンペーンも併用推奨。',
        url: '#'
    },
    'furunavi': {
        date: '月末〜月初の各種キャンペーン',
        note: 'Amazonギフト券やPayPayボーナスなどの独自ポイントバックキャンペーン（最大10〜20%等）を実施している期間が狙い目。',
        url: '#'
    }
};

function renderFurusatoRadio() {
    const container = document.getElementById('furusato-ec');
    container.innerHTML = furusatoEcSites.map(site => {
        const isSelected = selectedFurusato === site.id;
        return `
        <label class="relative flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-amber-500 bg-slate-900 shadow-md transform -translate-y-0.5' : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 shadow-sm'}">
            <input type="radio" name="furusato" value="${site.id}" class="absolute opacity-0 w-0 h-0" ${isSelected ? 'checked' : ''}>
            <div class="absolute top-2 right-2 ${isSelected ? 'text-amber-500' : 'text-transparent'}">
                <i class="fas fa-check-circle text-lg"></i>
            </div>
            <i class="fas ${site.icon} text-2xl mb-2 ${isSelected ? 'text-amber-500' : (site.color || 'text-slate-400')}"></i>
            <span class="text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-700'} text-center leading-tight">${site.name}</span>
        </label>
        `;
    }).join('');

    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedFurusato = e.target.value;
                renderFurusatoRadio();
                showFurusatoResult(e.target.value);
            }
        });
    });
}

function showFurusatoResult(siteId) {
    const rule = furusatoRules[siteId];
    if (!rule) return;

    document.getElementById('furusato-date').textContent = rule.date;
    document.getElementById('furusato-note').textContent = rule.note;
    document.getElementById('furusato-link').href = rule.url;

    const resultArea = document.getElementById('furusato-result');
    resultArea.classList.remove('hidden');
    
    // アニメーション再トリガー
    resultArea.classList.remove('animate-fade-in');
    void resultArea.offsetWidth;
    resultArea.classList.add('animate-fade-in');
}

document.addEventListener('DOMContentLoaded', init);