const nameInput = document.getElementById("name");
const startingBidInput = document.getElementById("startingbid");
const educationSelect = document.getElementById("education");
const networthSelect = document.getElementById("networth");
const casteSelect = document.getElementById("caste");
const skillsCheckboxes = document.querySelectorAll(".skills");
const ageRadios = document.querySelectorAll("input[name='age']");
const reputationCheckboxes = document.querySelectorAll(".reputation");
const loveLetterInput = document.getElementById("loveLetter");
const calculateButton = document.getElementById("calculate");
const resultParagraph = document.getElementById("result");

const parseSkillValue = skill => parseFloat(skill.value);

const sumSkillValues = (sum, value) => sum + value;

const calculate = () => {
    const name = nameInput.value.trim();
    const startingBid = parseFloat(startingBidInput.value);

    if (name && !isNaN(startingBid) && startingBid > 0) {
        const educationCoeff = parseFloat(educationSelect.value) || 1;
        const networthCoeff = parseFloat(networthSelect.value) || 1;
        const casteAdjustment = parseFloat(casteSelect.value) || 0;
        const ageCoeff = parseFloat(document.querySelector("input[name='age']:checked")?.value) || 1;

        let skillsBonus = 0;
        Array.from(skillsCheckboxes).forEach(skill => {
            if (skill.checked) {
                skillsBonus += parseFloat(skill.value);
            }
        });

        
        let reputationCoeff = 1;
        let reputationPenalty = 0;
        const checkedReputations = Array.from(reputationCheckboxes).filter(rep => rep.checked);

        for (let i = 0; i < checkedReputations.length; i++) {
            const value = parseFloat(checkedReputations[i].value);
            if (value > 0 && value < 1) {
                reputationCoeff *= value;
            } else if (value < 0) {
                reputationPenalty += value;
            }
        }

        const totalCoeff = educationCoeff * networthCoeff * ageCoeff * reputationCoeff;

        let price = startingBid * totalCoeff;

        const totalAdditions = casteAdjustment + skillsBonus + reputationPenalty;

        price += totalAdditions;

        const person = {
            name,
            price: price.toFixed(2),
            loveLetter: loveLetterInput.value.trim(),
        };

        resultParagraph.innerHTML = `
            <div class="alert alert-success">
                <h4>Price for ${person.name}: $${person.price}</h4>
                ${person.loveLetter ? `<p>Your love letter:</p><blockquote>${person.loveLetter}</blockquote>` : ''}
            </div>
        `;
    } else {
        resultParagraph.innerHTML = '<div class="alert alert-danger">Please enter a valid name and starting bid.</div>';
    }
};

calculateButton.addEventListener('click', calculate);
