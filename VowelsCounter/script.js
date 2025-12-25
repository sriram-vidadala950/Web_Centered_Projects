const content = document.getElementById('content');
const counts = document.querySelectorAll('.count');

document.querySelector('.result').style.display = 'none';
document.querySelector('.reset').style.display = 'none';

let vowelsMap = {}
let consonentsMap = {}
let specialMap = {}
function countWords() {
    let vowelsCounter = 0;
    let consonentsCounter = 0;
    let wordCounter = 0;
    let charCounter = 0;
    let specialCharacters = 0;

    vowelsMap = {}
    consonentsMap = {}
    specialMap = {}

    const textcontent = content.value.trim();

    if (textcontent === "") {
        counts.forEach(el => el.textContent = 0);
        return;
    }

    const words = textcontent.split(/\s+/);
    wordCounter = words.length;         

    words.forEach(word => {
        [...word].forEach(char => {
            charCounter++;
            if ('aeiouAEIOU'.includes(char)) {
                vowelsCounter++;
                addMap(vowelsMap, char.toLowerCase())
            } else if (char.match(/[a-z]/i)) {
                consonentsCounter++;
                addMap(consonentsMap, char.toLowerCase())
            } else{
                specialCharacters++;
                addMap(specialMap, char)
            }
        });
    });

    animateCount(counts[0], vowelsCounter);
    animateCount(counts[1], consonentsCounter);
    animateCount(counts[2], wordCounter);
    animateCount(counts[3], charCounter );
    animateCount(counts[4],specialCharacters);
    displayResult()
}

function addMap(map, char){
    map[char] = map[char]?map[char]+1 : 1
}

function toggleCharacters(type){
    const el = document.getElementById(`${type}-details`)
    let data;

    if(type==='vowels') data = vowelsMap
    if(type==='consonents') data = consonentsMap
    if(type==='special') data = specialMap

    el.classList.toggle('hidden');

    el.innerHTML  = Object.keys(data).length? Object.entries(data).map(
        ([char,count])=>`<span><strong>${char}</strong> -> ${count}</span>`
    ).join(', ') : "No Data found"
}

function displayResult(){
    document.querySelector('.result').style.display='flex'
    document.querySelector('.reset').style.display='flex'
}

function animateCount(element, finalValue, duration = 500) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const value = Math.floor(progress * finalValue);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = finalValue;
        }
    }

    requestAnimationFrame(update);
}

function resetSearch(){
    content.value = ''
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.reset').style.display = 'none';
}