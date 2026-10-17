
const form = document.querySelector("#survey-form");
const steps = [...document.querySelectorAll(".step")];

const progressText = document.querySelector("#progress-text");
const progressFill = document.querySelector("#progress-fill");

const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const submitButton = document.querySelector("#submit-button");

const errorBox = document.querySelector("#error-box");
const retryButton = document.querySelector("#retry-button");

const surveyScreen = document.querySelector("#survey-screen");
const homeScreen = document.querySelector("#home-screen");
const subScreen = document.querySelector("#sub-screen");
const subContent = document.querySelector("#sub-content");

const friendTitle = document.querySelector("#friend-title");
const backButton = document.querySelector("#back-button");
const musicButton = document.querySelector("#music-button");

// 나중에 정답을 바꾸려면 이 값만 수정하면 돼.
const CORRECT_ANSWER = "pig";

let currentStep = 0;
let music = null;

function showStep(index) {
  currentStep = index;

  steps.forEach((step, i) => {
    step.classList.toggle("hidden", i !== index);
  });

  progressText.textContent = `질문 ${index + 1} / ${steps.length}`;
  progressFill.style.width =
    `${((index + 1) / steps.length) * 100}%`;

  prevButton.disabled = index === 0;
  nextButton.classList.toggle("hidden", index === steps.length - 1);
  submitButton.classList.toggle("hidden", index !== steps.length - 1);

  errorBox.classList.add("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function validateCurrentStep() {
  const fields = steps[currentStep].querySelectorAll("input, select");

  for (const field of fields) {
    if (!field.value.trim()) {
      field.focus();
      field.reportValidity();
      return false;
    }
  }

  return true;
}

nextButton.addEventListener("click", () => {
  if (!validateCurrentStep()) return;

  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
});

prevButton.addEventListener("click", () => {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateCurrentStep()) return;

  const answer = document.querySelector("#similarity").value;

 if (answer !== CORRECT_ANSWER) {
  errorBox.classList.remove("hidden");
  errorBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
  return;
}

const name = document.querySelector("#name").value.trim();

friendTitle.textContent = `${name}의 생일을 축하합니다!`;

surveyScreen.classList.add("hidden");
subScreen.classList.add("hidden");
homeScreen.classList.remove("hidden");

// 🏆 업적 달성!
unlockAchievement("firstVisit");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

retryButton.addEventListener("click", () => {
  errorBox.classList.add("hidden");
  document.querySelector("#similarity").focus();
});

document.querySelectorAll(".menu-button").forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;

    homeScreen.classList.add("hidden");
    subScreen.classList.remove("hidden");

    if (page === "letter") {
      subContent.innerHTML = `
        <h1>💌 생일축하 편지</h1>
        <p>주윤아 생일 진심으로 축하한다.</p>

        <p>원래는 생일 선물로 택배를 보내려고 했는데</p>
        <p>생각보다 과정이 너무 귀찮더라고</p>
        <p>그래서 이렇게 챗지피티와 너를 위한 사이트를 만들었어.</p>
        <p>비록 아직은 무능해서 챗지피티와 만들지만,</p>
        <p>그래도 디자인 하고 아이디어 구상하고 이런건 다 내가 직접 했으니</p>
        <p>암튼 내가 만든거임 ㅅㄱ.</p>

        <p>그리고 휴가 나올때 마다 항상 나를 만나도록.</p>
        <p>너가 없으니까 술 마실 사람도 없고 많이 적적하다.</p>
        <p>너가 많이 보고싶긴 하다만 국가가 막으니 어쩌겠냐.</p>

        <p>내가 살아생전 편지를 써 본적이 5번도 안될거 같아서</p>
        <p>이런 편지에 뭘 적어야할진 잘 모르겠지만</p>
        <p>이 편지에 내 진심이 다 안담겼다는걸 알아줘.</p>
        <p>그리고 오글거리는 말 적기가 너무 힘들다. 항마력딸린다.</p>

        <p>다시 한번 생일 축하하고 빨리 전역해서 사회에서 보자.</p>
        <p>사랑한다 개년아 ㅋㅋ</p>

      `;
    }

    if (page === "games") {
      subContent.innerHTML = `
        <h1>🎁 상품 획득 센터</h1>
        <p>상품을 얻기 위한 네 가지 시련이 기다리고 있다.</p>
        <button class="secondary-button" data-game="1">게임 1. 인간의 한계</button>
        <button class="secondary-button" data-game="2">게임 2. 반응속도 테스트</button>
        <button class="secondary-button" data-game="3">게임 3. 광고 시청 센터</button>
        <button class="secondary-button" data-game="4">게임 4. 끝없는 노가다</button>
        <div id="game-area"></div>
      `;

      subContent.querySelectorAll("[data-game]").forEach((gameButton) => {
        gameButton.addEventListener("click", () => {
          const number = gameButton.dataset.game;

          const descriptions = {
            1: "극악의 난이도를 준비 중입니다. 각오하세요.",
            2: "버튼을 누르기만 하면 됩니다. 아마도요.",
            3: "광고를 불러오는 중... 광고가 없습니다.",
            4: "클릭 노가다 시스템을 준비 중입니다."
          };

          document.querySelector("#game-area").innerHTML = `
            <div class="error-box">
              <h2>게임 ${number}</h2>
              <p>${descriptions[number]}</p>
            </div>
          `;
        });
      });
    }

    if (page === "animals") {
      subContent.innerHTML = `
        <h1>❓ ???</h1>
        <p>이곳은 매우 중요한 전시관입니다.</p>
        <div class="cake">🐾</div>
        <p>다음 단계에서 네 동물 사진과 소개를 넣어 보자!</p>
      `;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

backButton.addEventListener("click", () => {
  subScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

musicButton.addEventListener("click", async () => {
  if (!music) {
    music = new Audio("birthday-song.mp3");
    music.loop = true;
  }

  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ 노래 정지";
    } catch (error) {
      musicButton.textContent = "노래 파일을 추가해 주세요";
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ 생일축하 노래 재생";
  }
});

showStep(0);
// 업적 목록
const achievements = {
  firstVisit: {
    title: "응 구라야",
    description: "이태협의 생일 축하 사이트에 속았다!",
    icon: "🏆"
  },

  readLetter: {
    title: "나의 진심",
    description: "편지를 열어봤다!",
    icon: "💌"
  },

  gameClear: {
    title: "도전 정신",
    description: "게임을 클리어했다!",
    icon: "🎮"
  }
};


// 업적 달성 함수
function unlockAchievement(id) {
  const achievement = achievements[id];

  if (!achievement) return;

  // 이미 획득한 업적인지 확인
  const saved = JSON.parse(
    localStorage.getItem("unlockedAchievements") || "[]"
  );

  if (saved.includes(id)) return;

  // 획득한 업적 저장
  saved.push(id);

  localStorage.setItem(
    "unlockedAchievements",
    JSON.stringify(saved)
  );

  const container = document.getElementById(
    "achievement-container"
  );

  if (!container) return;

  // 업적 창 만들기
  container.replaceChildren();

  const toast = document.createElement("div");
  toast.className = "achievement-toast";

  const icon = document.createElement("div");
  icon.className = "achievement-icon";
  icon.textContent = achievement.icon;

  const heading = document.createElement("h3");
  heading.textContent = "업적 달성!";

  const title = document.createElement("p");
  title.style.fontWeight = "bold";
  title.style.fontSize = "20px";
  title.textContent = achievement.title;

  const description = document.createElement("p");
  description.textContent = achievement.description;

  const button = document.createElement("button");
  button.className = "achievement-confirm";
  button.textContent = "확인";

  // 확인 버튼을 누르면 업적 창 닫기
  button.addEventListener("click", () => {
    container.replaceChildren();
    container.style.display = "none";
  });

  toast.append(icon, heading, title, description, button);
  container.appendChild(toast);

  container.style.display = "flex";
}