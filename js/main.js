// ------------------------------------------------------
// ✅ FIXED FEMALE → ELSE MALE VOICE SELECTION (100% WORKING)
// ------------------------------------------------------
let selectedVoice = null;

function loadVoices() {
    const voices = window.speechSynthesis.getVoices();

    // Priority female voices list
    const femalePriority = [
        "Female",
        "Woman",
        "Girl",
        "Google UK English Female",
        "Google हिन्दी",
        "Google हिंदी",
        "Hindi Female",
        "Samantha",
        "Victoria"
    ];

    // Priority male voices list (backup)
    const malePriority = [
        "Male",
        "Man",
        "Boy",
        "Google US English",
        "Daniel",
        "Alex",
        "Google UK English Male"
    ];

    // 1️⃣ Try to find a FEMALE voice
    for (let name of femalePriority) {
        let found = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
        if (found) {
            selectedVoice = found;
            break;
        }
    }

    // 2️⃣ If no FEMALE found → try to find a MALE voice
    if (!selectedVoice) {
        for (let name of malePriority) {
            let found = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
            if (found) {
                selectedVoice = found;
                break;
            }
        }
    }

    // 3️⃣ Fallback → ANY available voice
    if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
    }

    console.log("🎤 Selected Voice →", selectedVoice ? selectedVoice.name : "NONE");
}

window.speechSynthesis.onvoiceschanged = loadVoices;



// ------------------------------------------------------
// UI Variables
// ------------------------------------------------------
let mic = document.getElementById("mic");
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');

let intro = ["Hello user!", "Hi, I am an AI voice assistant created by DWS", "Hello, My name is Chatbot DWS"];
let help = ["How may I assist you?", "How can I help you?", "What can I do for you today?"];
let greetings = ["I am great!", "I am fine, what about you?", "I'm good, how are you?"];
let hobbies = ["I love to talk with humans", "I like to make friends like you", "I like cooking", "I like to help others"];
let pizzas = ["Which type of pizza do you like?", "I can make a pizza for you", "I would love to make a pizza for you", "Would you like cheese pizza?"];
let thank = ["Most welcome", "Not an issue", "It's my pleasure", "Mention not"];
let closing = ['Ok bye', 'As you wish, bye take care', 'Bye-bye, see you soon!'];
let def = ['Sorry my dear DWS user , I could not get you ', "dear DWS user I did not understand, please try again", 'dear DWS user, Please try searching for this on the web'];

// ----------------------------
// 🔥 HARD-CODED PROJECT ANSWERS
// ----------------------------
let qaData = [
    {
        keys: ["who are you"],
        answer:
            `I am an AI ChatBot created by the students and faculty of Divine Word School (DWS), developed by Ommik Tamai, Agam Badu, Dilumein Pertin, and Tatlom Libang.You may ask me anything related to coding, mathematics, school projects, or general help.`
    },
    {
        keys: ["aap Kaun Hain","aap kon hai", "kon", "aap kya ho", "apne aap ko parichit karayein", "tum kaun ho"],
        answer:
            `Main ek AI Chatbot hoon jise Divine Word School (DWS) ke students aur faculty ne banaya hai. Is project ko Ommik Tamai, Agam Badu, Dilumein Pertin aur Tatlom Libang ne develop kiya hai.
Aap mujhse coding, mathematics, school projects ya general help se jude kisi bhi prashan pooch sakte hain.`

    },

    {
        keys: ["tell me your project","project", "what have you made", "tell me about your project", "project made"],
        answer:
            `It is an Intelligent Quiz and Examination Portal — a secure, transparent and efficient Computer-Based Testing (CBT) system.This platform includes AI Chat Assistant  an intelligent system that provides academic support AI Voice Agent where students can speak their doubts and get real-time explanations. Real-Time Doubt Support  ensures instant guidance during exams. Students can take MCQ-based exams, clarify doubts instantly, and receive accurate,immediate results.`
    },
    {
        keys: ["aapane kya banaya hai"],
        answer:
            `Yeh ek Intelligent Quiz aur Examination Portal hai — jo ek surakshit, transparent aur efficient Computer-Based Testing (CBT) system hai.Is platform mein AI Chat Assistant shamil hai — ek intelligent system jo academic support provide karta hai. AI Voice Agent ke madhyam se students apne doubts bolkar turant explanation prapt kar sakte hain.Real-Time Doubt Support system exam ke dauran turant margdarshan sunishchit karta hai. Students yahan MCQ-based exams de sakte hain, apne doubts turant clear kar sakte hain, aur sahi aur tatkaal parinaam prapt kar sakte hain.`
    },

    {
        keys: ["why are you making this", "purpose", "reason", "why"],
        answer:
            `Our school, Divine Word School, Roing , Arunachal Pradesh , is organizing its First Edition of the Science Exhibition on 28–29 November 2025.As part of this exhibition, we have created an innovative computer science project “Intelligent Quiz and Examination Portal”.The project aims to Provide secure and transparent Computer-Based Testing and enable real-time doubt clearing  and Integrate AI Chat and Voice Assistance for learning support and We hope this project inspires curiosity and motivates students to explore the future of technology and AI.`
    },
    {
        keys: ["Kyon a project banaa rahe ho"],
        answer:
            `Hamare school, Divine Word School, Roing, Arunachal Pradesh, mein 28–29 November 2025 ko pehli Science Exhibition ka ayojan ho raha hai.Is exhibition ke hissa ke roop mein, humne ek navachar Computer Science project banaya hai jiska naam hai — "Intelligent Quiz and Examination Portal".Is project ka uddeshya surakshit aur transparent Computer-Based Testing pradan karna, real-time doubt clearing ki suvidha dena, aur AI Chat aur Voice Assistance ko learning support ke liye integrate karna hai.Hum aasha karte hain ki yeh project students mein jigyasa jagayega aur unhe bhavishya ki technology aur AI ke shetra ko explore karne ke liye prerit karega.`
    },
    {
        keys: ["divine word school", "tell me about divine word school", "dws", "about your school"],
        answer:
            `Divine Word School, Roing, located in the Lower Dibang Valley of Arunachal Pradesh, is a Higher Secondary institution known for its culture of openness, curiosity, and academic excellence.The school is led by Father Gulsan (Principal) and Father Selva (Vice Principal), both highly respected for their commitment to high-quality education and holistic development.DWS encourages mathematics, problem-solving, creativity, critical thinking, and participation in exhibitions, competitions, cultural events, sports, and innovative projects.The school continues to inspire young minds to grow into confident and capable individuals.`
    },
    {
        keys: ["School ke bare mein batao", "DWS ke bare mein batao", "divine word school ke bare mein batao", "kaha hai aapka school", "kaha hai dws"],
        answer:
            `Divine Word School, Roing, Arunachal Pradesh ke Lower Dibang Valley mein sthit ek
Higher Secondary sansthan hai, jo apni openness, jigyaasa aur utkrsht shaikshanik
sanskriti ke liye jaana jaata hai.School ka netritva Father Gulsan (Principal) aur Father Selva (Vice Principal) dwara kiya jaata hai,
jo uchch gunvattawali shiksha aur samagra vikas ke liye samarpit hain.DWS ganit, samasya-samadhan, rachnatmakta, critical thinking, aur exhibitions, competitions,sanskritik karyakramon, khelkood tatha navachar projects mein bhagidari ko protsaahit karta hai.Yeh school lagataar yuva vidyarthiyon ko prerit karta hai taaki ve atma-vishwasi aur saksham vyaktiyon ke roop mein vikasit ho saken.`
    },
    {
        keys: ["how", "How does this chatbot work?", "How does our voice assistant work?", "How did you make this project?", "How do we write the code for this project?", "how it works"],
        answer:
            `Our chatbot and voice assistant work by listening to the user’s voice, converting that voice into text, understanding the meaning of the spoken words, and then replying with a clear, human-like voice. When the user speaks into the microphone, the system captures the audio and uses speech-to-text technology to turn the voice into written text. The program then checks this text against predefined commands and provides the appropriate response— The same basic process is used by larger systems like Alexa, Siri, and Google Assistant, but our project is a simpler version built for learning and demonstration`
    },
    {
        keys:["who are the judges"],
        answer:`The judges for today’s Science Exhibition Programme, conducted by DWS School, are Ms. Monica, TGT Science, Kendriya Vidyalaya Ms. Watinaro Ao, TGT Science and Vice Principal, Global Valley School, Roing Ms. Reeta Kumari, TGT Science, Nani Maria School`,
    },
    {
        keys:["judges kaun hain","judges ke bare mein batao"],
        answer:`Aaj ke Science Exhibition Programme ke judges, jo DWS School dwara aayojit kiya gaya hai, Ms. Monica, TGT Science, Kendriya Vidyalaya Ms. Watinaro Ao, TGT Science aur Vice Principal, Global Valley School, Roing Ms. Reeta Kumari, TGT Science, Nani Maria School hain.`,
    },
    {
        keys:["can you tell about me","who am I talking to "],
        answer:`I am talking to a wonderful person who is interested in science projects and eager to learn.`
    },
    {
        keys:["main kis se baat kar raha hun","kya aap mere bare mein bata sakte hain","main kis se baat kar raha hoon"],
        answer:`Main ek adbhut vyakti se baat kar raha hoon jo science projects mein ruchi rakhta hai aur seekhne ke liye utsuk hai.`
    },
    {
        keys: ["kaise", "aapka chatbot kaise kaam karta hai?", "aapka voice assistant kaise kaam karta hai?", "aapne yeh project kaise banaya?", "hum is project ke liye code kaise likhte hain?", "yeh kaise kaam karta hai"],
        answer:
            `Hamara chatbot aur voice assistant user ki awaaz ko sunkar, use text me badal kar, bole gaye shabdon ka arth samajh kar aur phir ek saaf, insaan jaisi awaaz me jawab dekar kaam karta hai. Jab user microphone me bolta hai, to system awaaz ko capture karta hai aur speech-to-text technology ka use karke use likhit text me badal deta hai. Uske baad program is text ko pehle se diye gaye commands se milata hai aur sahi response deta hai — jaise agar user ‘hello’ kahe to assistant jawab deta hai ‘Hello, I am your assistant’. Sahi jawab chunne ke baad assistant text-to-speech technology ka istemal karke us response ko awaaz me bolta hai. Yeh poora project JavaScript, speech recognition APIs aur speech synthesis tools ka use karke banaya gaya hai, jo milkar assistant ko sunne, samajhne aur bolne ki capability dete hain. Yahi basic process Alexa, Siri aur Google Assistant jaise bade systems me bhi hoti hai, lekin hamara project seekhne aur demonstration ke liye ek chhota aur simple version hai.`
    },
    {
        keys: ["thank you for your help", "thanks for your help", "thank you", "thanks"],
        answer:
            `You are very welcome! I am always here to help you. If you have any more questions or need assistance with anything else, feel free to ask. Have a great day!`
    },
    {
        keys:["who is the principal of divine word school","principal of dws","who is the principal of dws"],
        answer:`The principal of Divine Word School is Father Gulsan.`
    },
    {
        keys:["who is the vice principal of divine word school","vice principal of dws","who is the vice principal of dws"],    
        answer:`The vice principal of Divine Word School is Father Selva.`
    },
    {
        keys: ["aapki madad ke liye dhanyavaad", "aapki madad ke liye shukriya", "dhanyavaad", "shukriya"],
        answer:
            `Aapka bahut-bahut swagat hai! Main hamesha aapki madad ke liye yahan hoon. Agar aapke paas aur koi sawaal hain ya kisi aur cheez mein madad chahiye, to nishchint hokar pooch sakte hain. Aapka din shubh ho!`
    },
    {
        keys: ["tell me about the team members", "project team"],
        answer:
            `The project team consists of four dedicated students from Divine Word School: Ommik Tamai, Agam Badu, Dilumein Pertin and Tatlom Libang. They worked under the guidance of their Mathematics Teacher, Manish Ray, to develop this Intelligent Quiz and Examination Portal. Their combined skills in programming, problem-solving, and creativity made this innovative project possible.`
    },
    {
        keys: ["team ke sadasya", "team members kaun hain", "team members ke bare mein batao", "kon", "kon bana rahe hain ye project"],
        answer:
            `Project team mein Divine Word School ke teen samarpit students shamil hain: Ommik Tamai, Agam Badu, aur Tatlom Libang. Inhone apne Mathematics Teacher, Manish Ray, ke guidance mein is Intelligent Quiz and Examination Portal ko develop kiya. Inke programming, problem-solving, aur creativity ke combined skills ne is innovative project ko sambhav banaya.`
    },
    {
        keys:["who is ommik tamai", "tell me about ommik tamai", "about ommik tamai", "tell me about agam badu", "about agam badu", "tell me about tatlom libang", "about tatlom libang","Dilumein Pertin", "tell me about Dilumein Pertin", "about Dilumein Pertin"],
        answer:
            `student of Divine Word School who have a keen interest in programming and technology.  collaborated on this project under the mentorship of their Mathematics Teacher, Manish Ray.  dedication and passion for learning have driven to create this innovative Intelligent Quiz and Examination Portal.`
    },
    {
      keys:["ommik tamai", "agam badu", "tatlom libang","Dilumein Pertin","pertin"],
      answer:
          `Divine Word School ke vidyarthi hain jinko programming aur technology mein gehri dilchaspi hai. Inhone apne Mathematics Teacher, Manish Ray, ke mentorship mein is project par sahyog kiya. Inki lagan aur seekhne ka junoon hi inhe is innovative Intelligent Quiz and Examination Portal ko banane ke liye prerit karta hai.`    
    },
    {
      keys:["who is pertin", "tell me about pertin", "about pertin"],
      answer:
          `pertin is a goood girl `    
    }


];

function showusermsg(msg) {
    chatareaouter.innerHTML += `<div class="chatarea-inner user">${msg}</div>`;
}

function showchatbotmsg(msg) {
    chatareaouter.innerHTML += `<div class="chatarea-inner chatbot">${msg}</div>`;
}


// ------------------------------------------------------
// MAIN TALK FUNCTION
// ------------------------------------------------------
function chatbotvoice(message) {
    message = message.toLowerCase();
    let finalresult = "";

    const speech = new SpeechSynthesisUtterance();

    // Always set the selected voice
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    speech.pitch = 1;
    speech.rate = 1;

    // Check predefined QA data
    for (let q of qaData) {
        if (q.keys.some(k => message.includes(k))) {
            finalresult = q.answer;
            speech.text = finalresult;
            window.speechSynthesis.speak(speech);
            showchatbotmsg(finalresult.replace(/\n/g, "<br>"));
            return;
        }
    }

    // Default responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        finalresult = intro[Math.floor(Math.random() * intro.length)];
    }
    else if (message.includes('help') || message.includes('assist')) {
        finalresult = help[Math.floor(Math.random() * help.length)];
    }
    else if (message.includes('how are you')) {
        finalresult = greetings[Math.floor(Math.random() * greetings.length)];
    }
    else if (message.includes('hobby') || message.includes('about you')) {
        finalresult = hobbies[Math.floor(Math.random() * hobbies.length)];
    }
    else if (message.includes('pizza')) {
        finalresult = pizzas[Math.floor(Math.random() * pizzas.length)];
    }
    else if (message.includes('thank')) {
        finalresult = thank[Math.floor(Math.random() * thank.length)];
    }
    else if (message.includes('bye')) {
        finalresult = closing[Math.floor(Math.random() * closing.length)];
    }
    else {
        finalresult = def[Math.floor(Math.random() * def.length)];
    }

    // Speak out
    speech.text = finalresult;
    window.speechSynthesis.speak(speech);
    showchatbotmsg(finalresult);
}


// ------------------------------------------------------
// Speech Recognition
// ------------------------------------------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = function (e) {
    let transcript = e.results[e.resultIndex][0].transcript;
    showusermsg(transcript);
    chatbotvoice(transcript);
}

recognition.onend = function () {
    mic.style.background = "#ff3b3b";
}

mic.addEventListener("click", function () {
    mic.style.background = '#39c81f';
    recognition.start();
});