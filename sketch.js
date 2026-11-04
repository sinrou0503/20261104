let idleFrames = []; // 儲存角色待機時播放的打拳動畫影格。
let movingFrames = []; // 儲存角色移動時播放的眨眼動畫影格。
let characterX; // 記錄角色在畫布上的水平位置。
let characterY; // 記錄角色在畫布上的垂直位置。
let facingDirection = 1; // 記錄角色朝向；1 代表右方，-1 代表左方。
const backgroundColor = "#edf2fb"; // 設定畫布背景顏色。
const idleFrameWidth = 131; // 設定打拳圖片精靈中每格的寬度。
const idleFrameHeight = 171; // 設定打拳圖片精靈中每格的高度。
const idleFrameCount = 6; // 設定打拳圖片精靈的影格數量。
const movingFrameWidth = 84; // 設定眨眼圖片精靈中每格的寬度。
const movingFrameHeight = 191; // 設定眨眼圖片精靈中每格的高度。
const movingFrameCount = 18; // 設定眨眼圖片精靈的影格數量。
const animationSpeed = 100; // 設定每張動畫影格顯示的毫秒數。
const movementSpeed = 4; // 設定角色每次繪圖移動的像素數。

function preload() { // 在畫布建立前載入角色圖片。
  for (let frameIndex = 0; frameIndex < idleFrameCount; frameIndex++) { // 依序載入六張打拳動畫影格。
    idleFrames.push(loadImage(`一/打拳/${frameIndex}.png`)); // 載入目前編號的打拳影格。
  } // 結束打拳影格載入迴圈。
  for (let frameIndex = 0; frameIndex < movingFrameCount; frameIndex++) { // 依序載入十八張眨眼動畫影格。
    movingFrames.push(loadImage(`一/眨眼/${frameIndex}.png`)); // 載入目前編號的眨眼影格。
  } // 結束眨眼影格載入迴圈。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色的初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立填滿瀏覽器視窗的畫布。
  imageMode(CENTER); // 讓圖片以指定位置為中心繪製。
  characterX = width / 2; // 將角色放在畫布水平中央。
  characterY = height / 2; // 將角色放在畫布垂直中央。
} // 結束初始設定函式。

function draw() { // 每個動畫影格更新並繪製畫面。
  background(backgroundColor); // 使用指定的淡藍色清除畫布。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查左方向鍵是否正被按住。
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查右方向鍵是否正被按住。
  let activeFrames = idleFrames; // 預設使用打拳動畫影格。
  let frameWidth = idleFrameWidth; // 預設使用打拳影格的寬度。
  let frameHeight = idleFrameHeight; // 預設使用打拳影格的高度。
  let frameCount = idleFrameCount; // 預設使用打拳影格的總數。

  if (movingLeft) { // 如果按住左方向鍵，就讓角色向左移動。
    characterX -= movementSpeed; // 將角色的水平位置向左減少。
    facingDirection = -1; // 讓角色翻轉並面向左方。
    activeFrames = movingFrames; // 切換成眨眼動畫影格。
    frameWidth = movingFrameWidth; // 改用眨眼影格的寬度。
    frameHeight = movingFrameHeight; // 改用眨眼影格的高度。
    frameCount = movingFrameCount; // 改用眨眼影格的總數。
  } else if (movingRight) { // 否則，如果按住右方向鍵，就讓角色向右移動。
    characterX += movementSpeed; // 將角色的水平位置向右增加。
    facingDirection = 1; // 讓角色面向右方。
    activeFrames = movingFrames; // 切換成眨眼動畫影格。
    frameWidth = movingFrameWidth; // 改用眨眼影格的寬度。
    frameHeight = movingFrameHeight; // 改用眨眼影格的高度。
    frameCount = movingFrameCount; // 改用眨眼影格的總數。
  } // 結束方向鍵判斷。

  characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 限制角色不會移出畫布左右邊界。
  characterY = constrain(characterY, frameHeight / 2, height - frameHeight / 2); // 限制角色不會移出畫布上下邊界。
  const currentFrame = floor(millis() / animationSpeed) % frameCount; // 計算目前要播放的循環影格。

  push(); // 暫存畫布狀態，避免翻轉影響其他繪圖內容。
  translate(characterX, characterY); // 將繪圖原點移到角色中心。
  scale(facingDirection, 1); // 依照角色朝向水平翻轉圖片。
  image(activeFrames[currentFrame], 0, 0, frameWidth, frameHeight); // 繪製目前的動畫影格。
  pop(); // 還原畫布狀態。
} // 結束畫面更新與繪製函式。

function windowResized() { // 當瀏覽器視窗尺寸改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布繼續填滿整個視窗。
  characterX = constrain(characterX, movingFrameWidth / 2, width - movingFrameWidth / 2); // 將角色水平位置限制在新畫布範圍內。
  characterY = constrain(characterY, movingFrameHeight / 2, height - movingFrameHeight / 2); // 將角色垂直位置限制在新畫布範圍內。
} // 結束視窗尺寸變更函式。
