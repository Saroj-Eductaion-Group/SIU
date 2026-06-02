export function generateAISummary(result) {
  const { pct, grade, correct, wrong, skippedCount, totalMarks, diffData, sectionData, percentile } = result;

  // Strength & weakness from difficulty data
  const diffOrder = ['Easy', 'Moderate', 'Hard', 'Advanced'];
  const diffPcts = diffOrder.map(d => {
    const data = diffData?.[d];
    if (!data || data.total === 0) return null;
    return { label: d, pct: Math.round(data.correct / data.total * 100) };
  }).filter(Boolean);

  const strengths = diffPcts.filter(d => d.pct >= 70).map(d => d.label);
  const weaknesses = diffPcts.filter(d => d.pct < 50).map(d => d.label);

  // Strongest & weakest sections
  const secEntries = Object.entries(sectionData || {}).map(([sec, d]) => ({
    sec, pct: Math.round(d.correct / d.total * 100)
  }));
  const strongSec = secEntries.sort((a, b) => b.pct - a.pct).slice(0, 2).map(s => s.sec);
  const weakSec = secEntries.sort((a, b) => a.pct - b.pct).slice(0, 2).map(s => s.sec);

  // Accuracy
  const attempted = correct + wrong;
  const accuracy = attempted > 0 ? Math.round((correct / (attempted * (totalMarks / 50))) * 100) : 0;

  // Generate summary lines
  const lines = [];

  // Overall assessment
  if (pct >= 90) lines.push(`🌟 Outstanding performance! You scored ${pct}% placing you in the ${percentile} bracket. You are a strong candidate for the 100% Full Scholarship at Saroj International University.`);
  else if (pct >= 75) lines.push(`✅ Excellent result! Your ${pct}% score puts you in the ${percentile} bracket. You qualify for the 50% Fee Waiver scholarship at SIU.`);
  else if (pct >= 60) lines.push(`👍 Good performance with ${pct}% score. You are in the ${percentile} bracket and qualify for the 25% Fee Waiver scholarship at SIU.`);
  else if (pct >= 40) lines.push(`📘 Decent attempt with ${pct}% score. You are in the ${percentile} bracket. With focused preparation you can significantly improve your rank.`);
  else lines.push(`📚 Your score of ${pct}% shows room for improvement. Focus on fundamentals and attempt more mock tests to boost your performance.`);

  // Accuracy insight
  if (wrong > correct) lines.push(`⚠️ Accuracy Alert: You got ${wrong} wrong vs ${correct} correct. Avoid guessing — negative marking is reducing your score significantly.`);
  else if (accuracy >= 80) lines.push(`🎯 Excellent accuracy! You attempted questions carefully with ${wrong} wrong answers. Keep this disciplined approach.`);
  else lines.push(`🎯 Your accuracy can be improved. Try to attempt only questions you are confident about to avoid negative marking.`);

  // Skipped insight
  if (skippedCount > 10) lines.push(`⏭️ You skipped ${skippedCount} questions. Review time management — try to attempt at least 40+ questions in the exam.`);
  else if (skippedCount === 0) lines.push(`💪 Great attempt rate! You attempted all questions showing strong confidence.`);

  // Difficulty insights
  if (strengths.length > 0) lines.push(`💡 Strength Areas: You performed well in ${strengths.join(' and ')} level questions. This is your competitive advantage.`);
  if (weaknesses.length > 0) lines.push(`🔴 Weak Areas: You struggled with ${weaknesses.join(' and ')} level questions. Focus your revision on these difficulty levels.`);

  // Section insights
  if (strongSec.length > 0) lines.push(`📗 Best Sections: ${strongSec.join(', ')} — keep revising these to maintain your edge.`);
  if (weakSec.length > 0) lines.push(`📕 Needs Work: ${weakSec.join(', ')} — dedicate extra study time to these topics before the next attempt.`);

  // Recommendations
  lines.push(`📋 Recommendations:`);
  if (pct < 60) {
    lines.push(`• Revise NCERT thoroughly — most SIUAT questions are concept-based.`);
    lines.push(`• Attempt at least 2 mock tests per week to build speed and accuracy.`);
    lines.push(`• Focus on Easy and Moderate questions first to secure base marks.`);
  } else if (pct < 80) {
    lines.push(`• Work on Hard and Advanced level questions to push your score above 80%.`);
    lines.push(`• Practice time management — aim to finish all 50 questions with 5 minutes to spare.`);
    lines.push(`• Review wrong answers carefully to identify recurring mistake patterns.`);
  } else {
    lines.push(`• Maintain your preparation level and attempt the next slot for an even better score.`);
    lines.push(`• Focus on Advanced level questions to push towards 95%+ for maximum scholarship.`);
    lines.push(`• Your current performance makes you a strong SIU scholarship candidate.`);
  }

  return lines;
}
