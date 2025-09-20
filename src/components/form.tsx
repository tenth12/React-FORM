import React, { useState } from "react";
import "../form.css";

const ParliamentForm: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [form, setForm] = useState<any>({title:"", firstName:"", lastName:"", party:"", ministerPosition:"", ministry:"", workHistory:"", achievements:"", photo:null});
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange=(e:any)=> {
    const {name,value,files} = e.target;
    setForm({...form, [name]: files ? files[0] : value});
  }

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    const photoUrl = form.photo ? URL.createObjectURL(form.photo) : "";
    if(editingId!==null){
      setMembers(members.map((m,i)=> i===editingId ? {...form, photoUrl} : m));
      setEditingId(null);
    }else{
      setMembers([...members,{...form, photoUrl}]);
    }
    setForm({title:"", firstName:"", lastName:"", party:"", ministerPosition:"", ministry:"", workHistory:"", achievements:"", photo:null});
  }

  const handleEdit=(index:number)=>{
    const m = members[index];
    setForm({...m, photo:null});
    setEditingId(index);
  }

  const handleDelete=(index:number)=>{
    setMembers(members.filter((_,i)=>i!==index));
  }

  return (
    <div className="parliament-form">
      <h2>สมาชิกสภาผู้แทนราษฎร</h2>
      <form onSubmit={handleSubmit}>
        <select name="title" value={form.title} onChange={handleChange}>
          <option value="">เลือกคำนำหน้า</option>
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        <input name="firstName" placeholder="ชื่อ" value={form.firstName} onChange={handleChange}/>
        <input name="lastName" placeholder="นามสกุล" value={form.lastName} onChange={handleChange}/>
        <input name="party" placeholder="พรรค" value={form.party} onChange={handleChange}/>
        <input name="ministerPosition" placeholder="ตำแหน่งรัฐมนตรี" value={form.ministerPosition} onChange={handleChange}/>
        <input name="ministry" placeholder="กระทรวง" value={form.ministry} onChange={handleChange}/>
        <textarea name="workHistory" placeholder="ประวัติการทำงาน" value={form.workHistory} onChange={handleChange}/>
        <textarea name="achievements" placeholder="ผลงานที่ผ่านมา" value={form.achievements} onChange={handleChange}/>
        <input type="file" name="photo" onChange={handleChange}/>
        <button type="submit">{editingId!==null ? "แก้ไข" : "เพิ่ม"}</button>
      </form>

      <div className="member-list">
        {members.map((m,i)=>(
          <div key={i} className="member-card">
            {m.photoUrl && <img src={m.photoUrl} alt={m.firstName}/>}
            <p>{m.title} {m.firstName} {m.lastName}</p>
            <p>พรรค: {m.party}</p>
            {m.ministerPosition && <p>{m.ministerPosition} ({m.ministry})</p>}
            <button className="edit-btn" onClick={()=>handleEdit(i)}>แก้ไข</button>
            <button className="delete-btn" onClick={()=>handleDelete(i)}>ลบ</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParliamentForm;
