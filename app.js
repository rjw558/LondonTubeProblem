var wordList = require('./stations.json'); // List of stations. Can be a list of anything you want if you chane the JSON.
var weightIndex = require('./weightIndex.json'); // List of letter number pairs. The number is the weighting of the letter.
var answer = solution(wordList, weightIndex);

console.log("Answer: " + answer); // Print out answer.

function solution(wordList, weightIndex) {
    var answer = []; // List to be populated by station names.
    var alpha = []; // List to record the letters of the alphabet already covered.

    // While there is still letters in the alphabet to find and the list of words has not been exhausted.
    while (wordList.length != 0 && alpha.length != 26) {
        var max = 0; // Keeps track of the largest weight so that the algorithm doesn't have to run over the weights again.
        var maxWord = ""; // Records the word with the heaviest weighting.
        var indexOfMax = 0; // For easy removal of the word from the list.

        // Go through each word in the list.
        for (i=0; i < wordList.length; i++) {
            var weight = 0; // Weight of the word

            // Go over each letter in the word.
            for (j=0; j < wordList[i].length; j++) {
                var letter = wordList[i].charAt(j);

                // Check if char is in the alphabet.
                if (letter.match(/[a-z]/i)) {
                    weight += weightIndex[letter.toLowerCase()]; // Increase the weight.
                }
            }

            // Keep track of the largest weighted word.
            if (weight > max) {
                max = weight;
                maxWord = wordList[i];
                indexOfMax = i;
            }

        }

        answer.push(maxWord); // Add the heaviest word to the list.

        // Record the chars covered by the word.
        for (j=0; j < maxWord.length; j++) {
            letter = maxWord.charAt(j).toLowerCase();

            // If the letter is not already recorder and is alphabetic, then add it to the list.
            if ((alpha.indexOf(letter) > -1) == false && letter.match(/[a-z]/i)) {
                alpha.push(letter);

            }
        }

        // Remove the word from the list of words.
        wordList.splice(indexOfMax, 1);
    }

    // Return the ist of word which covers the alphabet.
    return answer;
}
