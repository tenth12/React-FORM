import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Validation ด้วย Zod
const memberSchema = z.object({
  title: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo: z.instanceof(File, "กรุณาอัปโหลดรูปถ่าย"),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  ministerPosition: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().min(1, "กรุณาระบุพรรคการเมือง"),
});

type MemberForm = z.infer<typeof memberSchema>;

interface Member extends MemberForm {
  id: number;
  photoUrl: string;
}

const ParliamentMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<MemberForm>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = (data: MemberForm) => {
    const photoUrl = URL.createObjectURL(data.photo);
    if (editingId !== null) {
      // Edit
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingId ? { ...data, id: editingId, photoUrl } : m
        )
      );
      setEditingId(null);
    } else {
      // Add
      setMembers((prev) => [
        ...prev,
        { ...data, id: Date.now(), photoUrl },
      ]);
    }
    reset();
  };

  const onEdit = (member: Member) => {
    setEditingId(member.id);
    setValue("title", member.title);
    setValue("firstName", member.firstName);
    setValue("lastName", member.lastName);
    setValue("workHistory", member.workHistory || "");
    setValue("achievements", member.achievements || "");
    setValue("ministerPosition", member.ministerPosition || "");
    setValue("ministry", member.ministry || "");
    setValue("party", member.party);
  };

  const onDelete = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">สมาชิกสภาผู้แทนราษฎร</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">คำนำหน้า</label>
            <select {...register("title")} className="border p-2 rounded w-full">
              <option value="">-- เลือกคำนำหน้า --</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className="block font-semibold">ชื่อ</label>
            <input
              {...register("firstName")}
              className="border p-2 rounded w-full"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName.message}</span>
            )}
          </div>

          <div>
            <label className="block font-semibold">นามสกุล</label>
            <input
              {...register("lastName")}
              className="border p-2 rounded w-full"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName.message}</span>
            )}
          </div>

          <div>
            <label className="block font-semibold">รูปถ่าย 2"</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="border p-2 rounded w-full"
            />
            {errors.photo && (
              <span className="text-red-500 text-sm">{errors.photo.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">ประวัติการทำงาน</label>
            <textarea
              {...register("workHistory")}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">ผลงานที่ผ่านมา</label>
            <textarea
              {...register("achievements")}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">ตำแหน่งรัฐมนตรี</label>
            <input
              {...register("ministerPosition")}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">กระทรวง</label>
            <input
              {...register("ministry")}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">สังกัดพรรคการเมือง</label>
            <input
              {...register("party")}
              className="border p-2 rounded w-full"
            />
            {errors.party && (
              <span className="text-red-500 text-sm">{errors.party.message}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingId !== null ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}
        </button>
      </form>

      {/* List */}
      <h2 className="text-xl font-bold mb-2">รายชื่อสมาชิกทั้งหมด</h2>
      {members.length === 0 && <p>ยังไม่มีสมาชิก</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m) => (
          <div
            key={m.id}
            className="border p-4 rounded shadow flex flex-col items-center"
          >
            <img src={m.photoUrl} alt={`${m.firstName} ${m.lastName}`} className="w-32 h-32 object-cover rounded mb-2" />
            <h3 className="font-bold">{m.title} {m.firstName} {m.lastName}</h3>
            <p><strong>สังกัดพรรค:</strong> {m.party}</p>
            {m.ministerPosition && <p><strong>ตำแหน่ง:</strong> {m.ministerPosition} ({m.ministry})</p>}
            {m.workHistory && <p><strong>ประวัติการทำงาน:</strong> {m.workHistory}</p>}
            {m.achievements && <p><strong>ผลงานที่ผ่านมา:</strong> {m.achievements}</p>}
            <div className="mt-2 space-x-2">
              <button
                onClick={() => onEdit(m)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded"
              >
                แก้ไข
              </button>
              <button
                onClick={() => onDelete(m.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParliamentMembers;
