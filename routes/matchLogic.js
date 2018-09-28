//api logic
function compareScores(user1, user2) {
  let totalDifference = 0;
  for (let i = 0; i < user1.length; i++) {
    totalDifference += Math.abs(user1[i].interest - user2[i].interest);
  }
  return totalDifference;
}

function findBestMatch(user1, user2) {
  for (let i = 0; i < user1.length; i++) {
    if (user1[i].id === user2.id) {
      user1.splice(i, 1);
    }
  }
  const matchArr = [];
  for (let i = 0; i < user1.length; i++) {
    let totalDifference = compareScores(user1[i].Interests, user2.Interests);
    matchArr.push(totalDifference);
  }
  let lowestDiffIndex = matchArr.indexOf(Math.min(...matchArr));
  return user1[lowestDiffIndex].username;
}

module.exports = findBestMatch;
