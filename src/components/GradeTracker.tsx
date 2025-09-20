import React, { useState } from "react";
import "../GradeTracker.css";

const gradePoints: Record<string, number> = {
  A: 4.0, "B+": 3.5, B: 3.0, "C+": 2.5, C: 2.0, "D+": 1.5, D: 1.0, F: 0.0, W: 0.0,
};

interface Course { id: number; name: string; grade: string; }

const GradeTracker: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  const addCourse = () => {
    if (!name) return;
    setCourses([...courses, { id: Date.now(), name, grade }]);
    setName(""); setGrade("A");
  };

  const removeCourse = (id: number) => setCourses(courses.filter(c => c.id !== id));

  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.grade !== "W");
    if (validCourses.length === 0) return setGpa(0);
    const totalPoints = validCourses.reduce((sum, c) => sum + (gradePoints[c.grade] || 0), 0);
    setGpa(parseFloat((totalPoints / validCourses.length).toFixed(2)));
  };

  return (
    <div className="grade-tracker">
      <h2>GPA Tracker</h2>
      <div className="input-group">
        <input type="text" placeholder="ชื่อวิชา" value={name} onChange={(e)=>setName(e.target.value)} />
        <select value={grade} onChange={(e)=>setGrade(e.target.value)}>
          {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <button className="add-btn" onClick={addCourse}>เพิ่ม</button>
      </div>
      <ul>
        {courses.map(c => (
          <li key={c.id} className={c.grade==="F" ? "f-grade":""}>
            {c.name} - {c.grade}
            <button className="delete-btn" onClick={()=>removeCourse(c.id)}>ลบ</button>
          </li>
        ))}
      </ul>
      <button className="calculate-btn" onClick={calculateGPA}>คำนวณ GPA</button>
      {gpa!==null && <p>GPA: {gpa}</p>}
    </div>
  );
};

export default GradeTracker;
