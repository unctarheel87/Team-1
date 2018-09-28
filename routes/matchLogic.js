//api logic
function compareScores(user1, user2) {
  let totalDifference = 0;
  for (let i = 0; i < user1.length; i++) {
    totalDifference += Math.abs(user1[i].interest - user2[i].interest);
  }
  return totalDifference;
}

function findBestMatch(user1, user2) {
  const eligUsers = [];
  for (let i = 0; i < user1.length; i++) {
    if (
      user1[i].id === user2.id ||
      user1[i].Interests.length === 0 ||
      user1[i].matchId
    ) {
      eligUsers;
    } else {
      console.log("push");
      eligUsers.push(user1[i]);
    }
  }
  const matchArr = [];
  for (let i = 0; i < eligUsers.length; i++) {
    let totalDifference = compareScores(
      eligUsers[i].Interests,
      user2.Interests
    );
    matchArr.push(totalDifference);
  }
  let lowestDiffIndex = matchArr.indexOf(Math.min(...matchArr));
  return eligUsers[lowestDiffIndex];
}

module.exports = findBestMatch;
