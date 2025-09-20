import React, { useState } from 'react';
import './GradeTracker.css';

const GradeTracker = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [grade, setGrade] = useState('A');
  const [gpa, setGpa] = useState(null);

  const gradePoints = {
    'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5,
    'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0,
    'W': 0.0, // W ไม่นำมาคิดแต่ก็มีค่าเป็น 0
  };

  const handleAddSubject = () => {
    if (subjectName.trim() === '') return;
    setSubjects([...subjects, { name: subjectName, grade: grade }]);
    setSubjectName('');
    setGrade('A');
    setGpa(null); // รีเซ็ตค่า GPA เมื่อเพิ่มวิชาใหม่
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    setGpa(null); // รีเซ็ตค่า GPA เมื่อลบวิชา
  };

  const calculateGpa = () => {
    if (subjects.length === 0) {
      setGpa(0.00);
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
      // ไม่นำเกรด W มาคำนวณใน GPA
      if (subject.grade !== 'W') {
        totalPoints += gradePoints[subject.grade] * 3; // สมมติว่าทุกวิชามี 3 หน่วยกิต
        totalCredits += 3;
      }
    });

    const calculatedGpa = totalCredits === 0 ? 0.00 : (totalPoints / totalCredits).toFixed(2);
    setGpa(calculatedGpa);
  };

  return (
    <div className="container">
      <h2>โปรแกรมคำนวณเกรด (GPA Calculator)</h2>

      <div className="input-form">
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="ชื่อรายวิชา"
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          {Object.keys(gradePoints).map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button onClick={handleAddSubject}>เพิ่มรายวิชา</button>
      </div>

      <ul className="subject-list">
        {subjects.map((subject, index) => (
          <li key={index} className="subject-item">
            <span style={{ color: subject.grade === 'F' ? 'red' : 'white' }}>
              {subject.name} - {subject.grade}
            </span>
            <button onClick={() => handleDeleteSubject(index)}>ลบ</button>
          </li>
        ))}
      </ul>

      <div className="action-buttons">
        <button onClick={calculateGpa}>คำนวณ GPA</button>
      </div>

      {gpa !== null && (
        <div className="gpa-result">
          <h3>GPA ของคุณ: {gpa}</h3>
        </div>
      )}
    </div>
  );
};

export default GradeTracker;