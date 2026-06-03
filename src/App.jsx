/**
 * 全國EMBA馬拉松報名表單
 * Version: v2.0
 * Last Updated: 2026-06-03 15:45
 */
import { useState } from 'react'
import './index.css'

const orderItems = [
  { id: 'item-1', label: 'A1.兩人一房_單人費用 8,550', price: 8550 },
  { id: 'item-2', label: 'A2.一人一房_單人費用 11,800', price: 11800 },
  { id: 'item-3', label: 'B1.兩人一房,單人費用 5,650', price: 5650 },
  { id: 'item-4', label: 'B2.一人一房,單人費用 7,400', price: 7400 },
  { id: 'item-5', label: 'C. 全國EMBA賽事,報名費3,000', price: 3000 },
  { id: 'item-6', label: 'D. 選手之夜(不參加E馬跑步),費用1,000', price: 1000 },
  { id: 'item-7', label: 'E. 不跟團(自行安排),要參加12/6午餐,費用500', price: 500 },
]

function App() {
  const [formData, setFormData] = useState({
    name: '',
    familyCount: '',
    schoolYear: '',
    isMember: '',
    contactInfo: '',
    accommodationDetails: '',
    bankAccount: '',
    insuranceInfoSelf: '',
    insuranceInfoFamily: '',
    notes: ''
  })
  const [selectedItems, setSelectedItems] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (itemId, type) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [type]: !prev[itemId]?.[type]
      }
    }))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      let itemTotal = 0
      if (selectedItems[item.id]?.self) {
        itemTotal += item.price
      }
      if (selectedItems[item.id]?.family) {
        itemTotal += item.price
      }
      return total + itemTotal
    }, 0)
  }

  const totalAmount = calculateTotal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const selectedItemsData = orderItems.map(item => {
      const self = selectedItems[item.id]?.self;
      const family = selectedItems[item.id]?.family;
      if (self && family) return `${item.label} (本人, 眷屬)`;
      if (self) return `${item.label} (本人)`;
      if (family) return `${item.label} (眷屬)`;
      return null;
    }).filter(Boolean)
    
    const dataToSubmit = {
      ...formData,
      items: selectedItemsData,
      total: totalAmount
    }

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoOu2BNbGoQRQ_E_3URtU9tyygEI03Eg1EKgQ1dyJHIcX2WcPW8Z7ib-X_evVEwKjY/exec'

    if (GOOGLE_SCRIPT_URL === '請替換成您的_APPS_SCRIPT_網址') {
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitted(true)
      }, 1500)
    } else {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(dataToSubmit),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      })
      .then(() => {
        setIsSubmitting(false)
        setSubmitted(true)
      })
      .catch(err => {
        setIsSubmitting(false)
        alert('送出失敗，請稍後再試！')
        console.error(err)
      })
    }
  }

  if (submitted) {
    return (
      <div className="app-container">
        <div className="form-wrapper">
          <div className="form-card header-card success-card">
            <h2>報名成功！</h2>
            <p>您的報名資料已經成功送出，感謝您的參與。</p>
            <button 
              className="submit-btn" 
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: '', familyCount: '', schoolYear: '', isMember: '', contactInfo: '', accommodationDetails: '', bankAccount: '', notes: '' })
                setSelectedItems({})
              }}
            >
              返回重新填寫
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="form-wrapper">
        <div className="form-card header-card">
          <h1 className="header-title">2026全國EMBA馬拉松報名 （東華大學站）</h1>
          <div className="header-desc">
            <p>各位學長、學姊好！</p>
            <p>注意了！這不是演習，這是來自東華大學山海風光的召喚！2026 全國 EMBA 馬拉松 (東華站) 報名系統即將炸裂開啟！</p>
            <p>不管是為了重溫讀書時的青春（熱血）、為了洗刷平日在辦公室看報表的怨氣，還是單純想去花蓮呼吸不用課稅的新鮮空氣，這場盛宴你絕對不能缺席！</p>
            <p>為了讓大家義無反顧地下單報名，以下奉上「不得不跑的四大理由」：</p>
            <ul>
              <li><strong>拋開 KPI，進帳「公里數」：</strong>平時在公司算營收、算毛利，這次我們不算這些！我們只算配速和步頻。讓你的雙腳代替大腦，跑出人生新高度！</li>
              <li><strong>名正言順的「合法熬夜與痛風餐」：</strong>大家都知道，EMBA 馬拉松的重點從來都不是馬拉松，而是賽前賽後的「補給」與交流。東華站的風景配上學長姐們的歡笑聲，熱量直接歸零（才怪，但快樂加倍）！</li>
              <li><strong>學術與體能的雙重展現：</strong>誰說讀 EMBA 只會坐在冷氣房裡討論策略？我們要用實力證明：我們不僅策略長遠，腳步更長遠！</li>
              <li><strong>最完美的「拍照打卡」背景：</strong>東華大學那如詩如畫的校園和中央山脈，隨便一擺都是總裁級的運動大片，發到朋友圈保證點讚破表！</li>
            </ul>
            <p>💡 <strong>溫馨小提醒：</strong>經營企業需要永續，鍛鍊身體更需要持續。一個人跑得快，一群人跑得遠（而且比較好聊天）。不要再猶豫了，手指動起來，名額有限，晚了就只能在群組裡看我們發帥照囉！</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="form-body">
          
          <div className="form-card form-group">
            <label className="question-title">本人姓名 <span className="required">*</span></label>
            <div className="input-wrapper">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="您的回答" />
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">眷屬人數</label>
            <div className="input-wrapper">
              <input type="text" name="familyCount" value={formData.familyCount} onChange={handleInputChange} placeholder="您的回答" />
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">學年級 (例: 114) <span className="required">*</span></label>
            <div className="input-wrapper">
              <input type="text" name="schoolYear" value={formData.schoolYear} onChange={handleInputChange} required placeholder="您的回答" />
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">是否為漾跑社社員</label>
            <div className="radio-group">
              <label className="radio-label">
                <div className="radio-wrapper">
                  <input type="radio" name="isMember" value="YES" checked={formData.isMember === 'YES'} onChange={handleInputChange} />
                  <div className="custom-radio"></div>
                </div>
                <span className="radio-text">YES</span>
              </label>
              <label className="radio-label">
                <div className="radio-wrapper">
                  <input type="radio" name="isMember" value="NO" checked={formData.isMember === 'NO'} onChange={handleInputChange} />
                  <div className="custom-radio"></div>
                </div>
                <span className="radio-text">NO</span>
              </label>
            </div>
          </div>
          
          <div className="form-card form-group">
            <label className="question-title">聯繫方式 可留LINE ID or 電話 or Email (方便工作人員聯繫) <span className="required">*</span></label>
            <div className="input-wrapper">
              <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} required placeholder="您的回答" />
            </div>
          </div>

          <div className="form-card form-group section-special">
            <label className="question-title">團費方案</label>
            <div className="question-desc" style={{marginBottom: '2rem'}}>
              A. 三天兩夜(12/5~12/7)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;A1. 兩人一房_單人費用 8,550<br />
              &nbsp;&nbsp;&nbsp;&nbsp;A2. 一人一房_單人費用 11,800<br />
              B. 兩天一夜(12/5~12/6)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;B1. 兩人一房,單人費用 5,650<br />
              &nbsp;&nbsp;&nbsp;&nbsp;B2. 一人一房,單人費用 7,400<br />
              C. 全國EMBA賽事,報名費3,000<br />
              D. 選手之夜(不參加E馬跑步),費用1,000<br />
              E. 不跟團(自行安排),要參加12/6午餐,費用500<br /><br />
              備註：<br />
              1.方案A及B已包含保險,均不包含12/5晚餐(選手之夜)<br />
              2.住宿以花蓮阿思瑪飯店為估價標準,若因房源不足致調整者,另行通知,費用多退少補.<br />
              3.選擇兩天一夜(方案B)者,回程交通需自理.<br />
              4.選擇A或B方案者,請先繳交全額費用，屆時若因事需取消，將扣除訂金(3成)後退款，訂金作為選手之贊助金。<br />
              5.選擇C及D方案者,於參賽報名前可退費，報名後不予退款。<br />
              6.選擇E者,報名後因事需取消者,不予退款,做為選手之贊助金。<br />
              7.請於報名後請依所選項目費用,於6/5前繳費.<br />
              <span style={{ color: 'red', fontWeight: 'bold' }}>8. 此表格的計算為眷屬一人。 眷屬人數(若超過1人，漾跑社將主動與您聯繫)  先填表不匯款</span><br /><br />
              團費說明如下連結<br />
              https://drive.google.com/drive/folders/13bahDQw0hZVc7lTEq8BTxkP7gVSZvbwD?usp=sharing<br /><br />
              請依照以下參選項目的金額，匯款至漾跑社帳號。<br />
              漾跑社收款帳號銀行:<br />
              合作金庫(006)龍潭分行戶名: 簡雅惠<br />
              銀行帳號: 0161-765-421717
            </div>
            
            <div className="grid-table">
              <div className="grid-header-row">
                <div className="grid-cell"></div>
                <div className="grid-cell header-cell">本人</div>
                <div className="grid-cell header-cell">眷屬 (一人)</div>
              </div>
              <div className="items-list">
                {orderItems.map((item, index) => (
                  <div key={item.id} className={`item-row grid-row ${index % 2 === 1 ? 'striped' : ''}`}>
                    <span className="item-name grid-cell">{item.label}</span>
                    <div className="grid-cell center-column">
                      <label className="checkbox-wrapper">
                        <input type="checkbox" checked={!!selectedItems[item.id]?.self} onChange={() => handleCheckboxChange(item.id, 'self')} />
                        <div className="custom-checkbox"></div>
                      </label>
                    </div>
                    <div className="grid-cell center-column">
                      <label className="checkbox-wrapper">
                        <input type="checkbox" checked={!!selectedItems[item.id]?.family} onChange={() => handleCheckboxChange(item.id, 'family')} />
                        <div className="custom-checkbox"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="total-section">
              <span className="total-label">總計金額</span>
              <span className="total-amount">${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">匯款帳號後五碼及匯款金額 <span className="required">*</span></label>
            <div className="input-wrapper">
              <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} required placeholder="您的回答" />
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">請填寫保險資料 (本人)  姓名  身分證字號  出生年月日  電話 <span className="required">*</span></label>
            <div className="input-wrapper">
              <textarea name="insuranceInfoSelf" value={formData.insuranceInfoSelf} onChange={handleInputChange} rows="2" required placeholder="您的回答"></textarea>
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">請填寫保險資料 (眷屬)  姓名  身分證字號  出生年月日  電話</label>
            <div className="input-wrapper">
              <textarea name="insuranceInfoFamily" value={formData.insuranceInfoFamily} onChange={handleInputChange} rows="2" placeholder="您的回答"></textarea>
            </div>
          </div>

          <div className="form-card form-group">
            <label className="question-title">其他建議</label>
            <div className="input-wrapper">
              <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="1" placeholder="您的回答"></textarea>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? '處理中...' : '提交'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
