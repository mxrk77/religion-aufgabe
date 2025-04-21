// Meditation Timer Functionality
class MeditationTimer {
    constructor() {
      this.minutes = 5
      this.seconds = 0
      this.isRunning = false
      this.timer = null
      this.bellSound = new Audio("https://soundbible.com/grab.php?id=1815&type=mp3")
  
      // DOM Elements
      this.timerDisplay = document.getElementById("timer-display")
      this.startBtn = document.getElementById("start-timer")
      this.resetBtn = document.getElementById("reset-timer")
      this.increaseBtn = document.getElementById("increase-time")
      this.decreaseBtn = document.getElementById("decrease-time")
  
      // Initialize
      this.updateDisplay()
      this.setupEventListeners()
    }
  
    setupEventListeners() {
      this.startBtn.addEventListener("click", () => this.toggleTimer())
      this.resetBtn.addEventListener("click", () => this.resetTimer())
      this.increaseBtn.addEventListener("click", () => this.adjustTime(1))
      this.decreaseBtn.addEventListener("click", () => this.adjustTime(-1))
    }
  
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.timer)
        this.startBtn.textContent = "Start"
        this.startBtn.classList.remove("btn-danger")
        this.startBtn.classList.add("btn-primary")
      } else {
        this.timer = setInterval(() => this.countdown(), 1000)
        this.startBtn.textContent = "Pause"
        this.startBtn.classList.remove("btn-primary")
        this.startBtn.classList.add("btn-danger")
      }
      this.isRunning = !this.isRunning
    }
  
    countdown() {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.timerComplete()
          return
        }
        this.minutes--
        this.seconds = 59
      } else {
        this.seconds--
      }
      this.updateDisplay()
    }
  
    updateDisplay() {
      this.timerDisplay.textContent = `${this.minutes.toString().padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`
    }
  
    resetTimer() {
      clearInterval(this.timer)
      this.minutes = 5
      this.seconds = 0
      this.isRunning = false
      this.startBtn.textContent = "Start"
      this.startBtn.classList.remove("btn-danger")
      this.startBtn.classList.add("btn-primary")
      this.updateDisplay()
    }
  
    adjustTime(amount) {
      if (!this.isRunning) {
        this.minutes = Math.max(1, this.minutes + amount)
        this.updateDisplay()
      }
    }
  
    timerComplete() {
      clearInterval(this.timer)
      this.bellSound.play()
      this.isRunning = false
      this.startBtn.textContent = "Start"
      this.startBtn.classList.remove("btn-danger")
      this.startBtn.classList.add("btn-primary")
  
      // Show completion message
      const message = document.createElement("div")
      message.className = "alert alert-success mt-3"
      message.textContent = "Meditation complete. Take a moment to reflect on your experience."
      document.querySelector(".meditation-timer").appendChild(message)
  
      // Remove message after 5 seconds
      setTimeout(() => {
        message.remove()
      }, 5000)
  
      this.resetTimer()
    }
  }
  
  // Initialize the meditation timer when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("timer-display")) {
      new MeditationTimer()
    }
  })
  
  // Memorial Wall Functionality
  class MemorialWall {
    constructor() {
      this.memorials = [
        {
          name: "Maria Schmidt",
          years: "1945-2020",
          message: "Immer in unseren Herzen",
          photo: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "Hans Weber",
          years: "1932-2018",
          message: "Ein Leben voller Liebe",
          photo: "https://randomuser.me/api/portraits/men/72.jpg",
        },
        {
          name: "Elise Müller",
          years: "1950-2021",
          message: "Deine Weisheit lebt weiter",
          photo: "https://randomuser.me/api/portraits/women/32.jpg",
        },
        {
          name: "Thomas Becker",
          years: "1960-2019",
          message: "Unvergessen",
          photo: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
          name: "Sophie Klein",
          years: "1975-2022",
          message: "Dein Lächeln bleibt",
          photo: "https://randomuser.me/api/portraits/women/22.jpg",
        },
        {
          name: "Karl Schneider",
          years: "1928-2017",
          message: "Ein Leben für die Familie",
          photo: "https://randomuser.me/api/portraits/men/67.jpg",
        },
      ]
  
      this.wallElement = document.getElementById("memorial-wall")
      if (this.wallElement) {
        this.renderMemorials()
        this.setupAddMemorialForm()
      }
    }
  
    renderMemorials() {
      const memorialGrid = document.createElement("div")
      memorialGrid.className = "memorial-grid"
  
      this.memorials.forEach((memorial) => {
        const memorialItem = document.createElement("div")
        memorialItem.className = "memorial-item"
  
        memorialItem.innerHTML = `
                  <div class="memorial-photo">
                      <img src="${memorial.photo}" alt="${memorial.name}">
                  </div>
                  <div class="memorial-name">${memorial.name}</div>
                  <div class="memorial-years">${memorial.years}</div>
                  <div class="memorial-message">${memorial.message}</div>
              `
  
        memorialGrid.appendChild(memorialItem)
      })
  
      this.wallElement.appendChild(memorialGrid)
    }
  
    setupAddMemorialForm() {
      const formContainer = document.createElement("div")
      formContainer.className = "add-memorial-container mt-5"
      formContainer.innerHTML = `
              <button id="add-memorial-btn" class="btn">Gedenken hinzufügen</button>
              <div id="memorial-form" class="memorial-form" style="display: none; margin-top: 20px;">
                  <h4>Neues Gedenken hinzufügen</h4>
                  <form id="new-memorial-form">
                      <div class="form-group">
                          <label for="memorial-name">Name</label>
                          <input type="text" id="memorial-name" class="form-control" required>
                      </div>
                      <div class="form-group">
                          <label for="memorial-years">Lebensjahre</label>
                          <input type="text" id="memorial-years" class="form-control" placeholder="z.B. 1950-2020" required>
                      </div>
                      <div class="form-group">
                          <label for="memorial-message">Gedenkbotschaft</label>
                          <textarea id="memorial-message" class="form-control" required></textarea>
                      </div>
                      <button type="submit" class="btn">Hinzufügen</button>
                  </form>
              </div>
          `
  
      this.wallElement.appendChild(formContainer)
  
      // Event listeners
      document.getElementById("add-memorial-btn").addEventListener("click", () => {
        const form = document.getElementById("memorial-form")
        form.style.display = form.style.display === "none" ? "block" : "none"
      })
  
      document.getElementById("new-memorial-form").addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("memorial-name").value
        const years = document.getElementById("memorial-years").value
        const message = document.getElementById("memorial-message").value
  
        // Add new memorial
        this.memorials.push({
          name,
          years,
          message,
          photo: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 99)}.jpg`,
        })
  
        // Clear form
        document.getElementById("new-memorial-form").reset()
        document.getElementById("memorial-form").style.display = "none"
  
        // Re-render memorials
        document.querySelector(".memorial-grid").remove()
        this.renderMemorials()
  
        // Show success message
        const successMsg = document.createElement("div")
        successMsg.className = "alert alert-success mt-3"
        successMsg.textContent = "Gedenken erfolgreich hinzugefügt."
        this.wallElement.appendChild(successMsg)
  
        // Remove message after 3 seconds
        setTimeout(() => {
          successMsg.remove()
        }, 3000)
      })
    }
  }
  
  // Reflection Journal Functionality
  class ReflectionJournal {
    constructor() {
      this.journalContainer = document.getElementById("reflection-journal")
      this.prompts = [
        "Was bedeutet der Tod für mich persönlich?",
        "Wie gehe ich mit Verlust und Trauer um?",
        "Welche Bedeutung hat Spiritualität in meinem Leben?",
        "Wie kann ich mit Leid konstruktiv umgehen?",
        "Was gibt meinem Leben Sinn und Bedeutung?",
        "Wie kann ich mehr Mitgefühl für andere entwickeln?",
        "Welche Werte sind mir am wichtigsten und warum?",
        "Wie kann ich im gegenwärtigen Moment präsenter sein?",
      ]
  
      if (this.journalContainer) {
        this.renderJournal()
      }
    }
  
    renderJournal() {
      const today = new Date()
      const formattedDate = today.toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  
      // Get random prompt
      const randomPrompt = this.prompts[Math.floor(Math.random() * this.prompts.length)]
  
      const journalEntry = document.createElement("div")
      journalEntry.className = "journal-entry"
      journalEntry.innerHTML = `
              <div class="journal-date">${formattedDate}</div>
              <div class="journal-prompt">${randomPrompt}</div>
              <textarea class="journal-textarea" placeholder="Reflektiere hier..."></textarea>
              <button id="save-journal" class="btn">Speichern</button>
              <button id="new-prompt" class="btn" style="margin-left: 10px;">Neue Frage</button>
          `
  
      this.journalContainer.appendChild(journalEntry)
  
      // Event listeners
      document.getElementById("save-journal").addEventListener("click", () => {
        const textarea = document.querySelector(".journal-textarea")
        if (textarea.value.trim() !== "") {
          localStorage.setItem(
            `journal_${Date.now()}`,
            JSON.stringify({
              date: formattedDate,
              prompt: randomPrompt,
              entry: textarea.value,
            }),
          )
  
          // Show success message
          const successMsg = document.createElement("div")
          successMsg.className = "alert alert-success mt-3"
          successMsg.textContent = "Eintrag gespeichert."
          this.journalContainer.appendChild(successMsg)
  
          // Remove message after 3 seconds
          setTimeout(() => {
            successMsg.remove()
          }, 3000)
        }
      })
  
      document.getElementById("new-prompt").addEventListener("click", () => {
        const newPrompt = this.prompts[Math.floor(Math.random() * this.prompts.length)]
        document.querySelector(".journal-prompt").textContent = newPrompt
      })
    }
  }
  
  // Initialize components when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize Memorial Wall if element exists
    if (document.getElementById("memorial-wall")) {
      new MemorialWall()
    }
  
    // Initialize Reflection Journal if element exists
    if (document.getElementById("reflection-journal")) {
      new ReflectionJournal()
    }
  
    // Breathing animation for meditation space
    const breathingCircle = document.querySelector(".breathing-circle")
    if (breathingCircle) {
      let breathingIn = true
  
      setInterval(() => {
        if (breathingIn) {
          document.querySelector(".breathing-text").textContent = "Ausatmen..."
        } else {
          document.querySelector(".breathing-text").textContent = "Einatmen..."
        }
        breathingIn = !breathingIn
      }, 4000)
    }
  })
  