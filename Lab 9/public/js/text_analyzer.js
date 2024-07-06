  /*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element.  
You will take in the text input , convert it to all lowercase and generate some text statistics based on the input.
You will calculate the following statistics based on the text:
Original Input: you will just show the input that the user entered (see below)
Total Number Letters: total number of letter characters in the text ,
Total Number of Non-Letters: total number of non-letters in the text (including spaces),
Total Number of Vowels: total number of vowels in the text (not counting y),
Total Number of Consonants: total number of consonants in the text (counting y),
Total Number of Words: total number of words in the text; a word is defined as any sequence of letters broken by any not-letter. For example, the phrase to-do is two words; a word does not start until a letter appears,
Total Number of Unique Words: total number of unique words that appear in the lowercased text,
Total Number of Long Words: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
Total Number of Short Words: number of words in the text that are 3 or less letters long; this is a total count of individual words, not unique words
This lab is easy to over-complicate by attempting to be too clever. I am giving two important pieces of advice:

You will generate the following HTML every time the application processes the text and append it to the text_output div.  
You will be using a data list element (dl), inside the dl, you will have a data title (dt) that has the title of the stat and then a data description (dd) which has the value. (see expected output below)

Here is the output based on the input: "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"
<dl>

  <dt>Original Input:</dt>

  <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

  <dt>Total Number Of Letters</dt>

  <dd>40</dd>

  <dt>Total Number of Non-Letters</dt>

  <dd>27</dd>

  <dt>Total Number of Vowels</dt>

  <dd>14</dd>

  <dt>Total Number of Consonants</dt>

  <dd>26</dd>

  <dt>Total Number of Words</dt>

  <dd>11</dd>

  <dt>Total Number of Unique Words</dt>

  <dd>9</dd>

  <dt>Total Number of Long Words</dt>

  <dd>3</dd>

  <dt>Total Number of Short Words</dt>

  <dd>6</dd>

</dl>
You will generate the above HTML and append it to the div every time the form is submitted, so you will have multiple data lists (dl) in the div, one for each time the user inputs and processes some text. So for example:

If the user submitted the following input and processed it:

1. "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"

2. "The quick brown fox jumps over the lazy dog."

3.  "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"

Your div would look like this:

<div id="text_output">

  <dl>

    <dt>Original Input:</dt>

    <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

    <dt>Total Number of Letters</dt>

    <dd>40</dd>

    <dt>Total Number of Non-Letters</dt>

    <dd>27</dd>

    <dt>Total Number of Vowels</dt>

    <dd>14</dd>

    <dt>Total Number of Consonants</dt>

    <dd>26</dd>

    <dt>Total Number of Words</dt>

    <dd>11</dd>

    <dt>Total Number of Unique Words</dt>

    <dd>9</dd>

    <dt>Total Number of Long Words</dt>

    <dd>3</dd>

    <dt>Total Number of Short Words</dt>

    <dd>6</dd>

  </dl>

  <dl>

    <dt>Original Input:</dt>

    <dd>The quick brown fox jumps over the lazy dog.</dd>

    <dt>Total Number of Letters</dt>

    <dd>35</dd>

    <dt>Total Number of Non-Letters</dt>

    <dd>9</dd>

    <dt>Total Number of Vowels</dt>

    <dd>11</dd>

    <dt>Total Number of Consonants</dt>

    <dd>24</dd>

    <dt>Total Number of Words</dt>

    <dd>9</dd>

    <dt>Total Number of Unique Words</dt>

    <dd>8</dd>

    <dt>Total Number of Long Words</dt>

    <dd>0</dd>

    <dt>Total Number of Short Words</dt>

    <dd>4</dd>

  </dl>

  <dl>

    <dt>Original Input:</dt>

    <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

    <dt>Total Number of Letters</dt>

    <dd>40</dd>

    <dt>Total Number of Non-Letters</dt>

    <dd>27</dd>

    <dt>Total Number of Vowels</dt>

    <dd>14</dd>

    <dt>Total Number of Consonants</dt>

    <dd>26</dd>

    <dt>Total Number of Words</dt>

    <dd>11</dd>

    <dt>Total Number of Unique Words</dt>

    <dd>9</dd>

    <dt>Total Number of Long Words</dt>

    <dd>3</dd>

    <dt>Total Number of Short Words</dt>

    <dd>6</dd>

  </dl>

</div>
If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of the error on the page. If the user enters bad data, you should not continue processing and instead inform them of the error on the page.

The form should reset itself every time after an input has been processed.
*/

let form = document.getElementById('id_for_form');
let error_div = document.getElementById('error')

if (form) {
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      error_div.innerHTML = '';

      let text_by_user = document.getElementById("text_to_analyze").value;
      if(text_by_user === ''){
        let p = document.createElement('p');
        p.innerHTML = "No Value given in input. Cannot process further."
        error_div.appendChild(p)
        return

      }
      
      text_by_user = document.getElementById("text_to_analyze").value.toLowerCase();
      
      let length_of_sentence = 0;
      for(let i=0;i<text_by_user.length;i++){
        if(text_by_user[i] >= 'a' && text_by_user[i]<='z'){
          length_of_sentence++;
        }
      }
      
      let length_of_sentence_space = 0;
      for(let j=0;j<text_by_user.length;j++){
        if(!(text_by_user[j] >= 'a' && text_by_user[j]<='z')){
          length_of_sentence_space++;
        }
      }

      let vowel_count =0;
      let consonant_count = 0;
      let vowels = ['a','e','i','o','u'];
      for(let k=0;k<text_by_user.length;k++){
        if(vowels.includes(text_by_user[k])){
          vowel_count++;
        }
      }
      for(let m=0;m<text_by_user.length;m++){
        if(!(vowels.includes(text_by_user[m])) && text_by_user[m]>='a' && text_by_user[m]<='z' ){
          consonant_count++;
        }
      }

      const unique_words = new Set();
      const words_array = text_by_user.trim().split(" ")
      let c=0;
      const proper_words = [];
      for(let i of words_array){
        if (/[a-zA-Z]/.test(i)) {
          proper_words.push(i);
          c++;
      }
      }
      const proper_words_count = c;
      for(let n=0;n<proper_words.length;n++){
        let word_a = proper_words[n].replace(/[^a-zA-Z\s]/g, '');
        unique_words.add(word_a);
      }
      let unique_words_count = unique_words.size;
      let short_words = 0;
      let long_words = 0;
      for(let o=0;o<proper_words.length;o++){
        let temp = proper_words[o].split('');
        let temp_c = 0
        for(m of temp){
          if(m>='a' && m<='z'){
            temp_c+=1;
          }
        }
        if(temp_c>=6 ){
          long_words++;
        }
      }
      for(let q=0;q<proper_words.length;q++){
        let temp = proper_words[q].split('');
        let temp_c = 0
        for(n of temp){
          if(n>='a' && n<='z'){
            temp_c+=1;
          }
        }
        if(temp_c<=3 ){
          short_words++;
        }
      }

      const to_print = `<dl><dt>Total Number of Letters</dt>
      <dd>${length_of_sentence}</dd>
      <dt>Total Number of Non-Letters</dt>
      <dd>${length_of_sentence_space}</dd>
      <dt>Total Number of Vowels</dt>
      <dd>${vowel_count}</dd>
      <dt>Total Number of Consonants</dt>
      <dd>${consonant_count}</dd>
      <dt>Total Number of Words</dt>
      <dd>${proper_words_count}</dd>
      <dt>Total Number of Unique Words</dt>
      <dd>${unique_words_count}</dd>
      <dt>Total Number of Long Words</dt>
      <dd>${long_words}</dd>
      <dt>Total Number of Short Words</dt>
      <dd>${short_words}</dd></dl>`

      document.getElementById('text_output').innerHTML += to_print;
      form.reset();
  })
  
}