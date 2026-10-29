
import { useState } from 'react'
import './App.css';

const dataAwal = [
  {
    id: 'm-1',
    nama: 'Cia',
    nim: '10121001',
    kelas: 'TI-2A',
    hadir: true,
  },
  {
    id: 'm-2',
    nama: 'Dokja',
    nim: '10121002',
    kelas: 'TI-2B',
    hadir: false,
  },
  {
    id: 'm-3',
    nama: 'Han sooyoung',
    nim: '10121003',
    kelas: 'TI-2A',
    hadir: false,
  },
]

function RingkasanPeserta({
  totalPeserta,
  jumlahHadir,
  jumlahBelumHadir,
  hasilDitampilkan,
}) {
  return (
    <div>
      <h2>Ringkasan Peserta</h2>
      <p>Total peserta: {totalPeserta}</p>
      <p>Hadir: {jumlahHadir}</p>
      <p>Belum hadir: {jumlahBelumHadir}</p>
      <p>Hasil ditampilkan: {hasilDitampilkan}</p>
    </div>
  )
}

function FormPeserta({
  form,
  setForm,
  onSubmit,
  editId,
  onBatal,
  pesan,
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Form Peserta</h2>

      <div>
        <label htmlFor="nama">Nama mahasiswa</label>
        <input
          id="nama"
          type="text"
          value={form.nama}
          onChange={(event) =>
            setForm({ ...form, nama: event.target.value })
          }
          placeholder="Masukkan nama"
        />
      </div>

      <div>
        <label htmlFor="nim">NIM</label>
        <input
          id="nim"
          type="text"
          value={form.nim}
          onChange={(event) =>
            setForm({ ...form, nim: event.target.value })
          }
          placeholder="Masukkan NIM"
        />
      </div>

      <div>
        <label htmlFor="kelas">Kelas</label>
        <select
          id="kelas"
          value={form.kelas}
          onChange={(event) =>
            setForm({ ...form, kelas: event.target.value })
          }
        >
          <option value="">Pilih kelas</option>
          <option value="TI-2A">TI-2A</option>
          <option value="TI-2B">TI-2B</option>
        </select>
      </div>

      {pesan && <p role="alert">{pesan}</p>}

      <button type="submit">
        {editId ? 'Simpan perubahan' : 'Tambah peserta'}
      </button>

      {editId && (
        <button type="button" onClick={onBatal}>
          Batal
        </button>
      )}
    </form>
  )
}

function ItemPeserta({
  item,
  onEdit,
  onHapus,
  onToggleHadir,
}) {
  return (
    <div>
      <h3>{item.nama}</h3>
      <p>NIM: {item.nim}</p>
      <p>Kelas: {item.kelas}</p>
      <p>Status: {item.hadir ? 'Hadir' : 'Belum hadir'}</p>

      <button type="button" onClick={() => onEdit(item)}>
        Edit
      </button>

      <button type="button" onClick={() => onHapus(item.id)}>
        Hapus
      </button>

      <button
        type="button"
        onClick={() => onToggleHadir(item.id)}
      >
        {item.hadir ? 'Batalkan hadir' : 'Tandai hadir'}
      </button>
    </div>
  )
}


function DaftarPeserta({
  peserta,
  totalPeserta,
  onEdit,
  onHapus,
  onToggleHadir,
}) {
  if (totalPeserta === 0) {
    return <p>Belum ada peserta.</p>
  }

  if (peserta.length === 0) {
    return <p>Peserta tidak ditemukan.</p>
  }

  return (
    <div>
      <h2>Daftar Peserta</h2>

      {peserta.map((item) => (
        <ItemPeserta
          key={item.id}
          item={item}
          onEdit={onEdit}
          onHapus={onHapus}
          onToggleHadir={onToggleHadir}
        />
      ))}
    </div>
  )
}



function FilterPeserta({
  pencarian,
  setPencarian,
  filterKelas,
  setFilterKelas,
}) {
  return (
    <div>
      <h2>Cari dan Filter Peserta</h2>

      <div>
        <label htmlFor="pencarian">
          Cari nama atau NIM
        </label>
        <input
          id="pencarian"
          type="text"
          value={pencarian}
          onChange={(event) =>
            setPencarian(event.target.value)
          }
          placeholder="Masukkan nama atau NIM"
        />
      </div>

      <div>
        <label htmlFor="filterKelas">
          Filter kelas
        </label>
        <select
          id="filterKelas"
          value={filterKelas}
          onChange={(event) =>
            setFilterKelas(event.target.value)
          }
        >
          <option value="">Semua kelas</option>
          <option value="TI-2A">TI-2A</option>
          <option value="TI-2B">TI-2B</option>
        </select>
      </div>
    </div>
  )
}


function App() {
  const [peserta, setPeserta] = useState(dataAwal)

  const [form, setForm] = useState({
    nama: '',
    nim: '',
    kelas: '',
  })

  const [editId, setEditId] = useState(null)
  const [pesan, setPesan] = useState('')
  const [pencarian, setPencarian] = useState('')
  const [filterKelas, setFilterKelas] = useState('')


  function kosongkanForm() {
    setForm({
      nama: '',
      nim: '',
      kelas: '',
    })
    setEditId(null)
    setPesan('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nama = form.nama.trim()
    const nim = form.nim.trim()
    const kelas = form.kelas

    if (nama.length < 3) {
      setPesan('Nama wajib diisi minimal 3 karakter.')
      return
    }

    if (!/^\d{8}$/.test(nim)) {
      setPesan('NIM harus terdiri dari tepat 8 digit.')
      return
    }

    if (!kelas) {
      setPesan('Silakan pilih kelas.')
      return
    }

    const nimSudahAda = peserta.some(
      (item) => item.nim === nim && item.id !== editId
    )

    if (nimSudahAda) {
      setPesan('NIM sudah digunakan peserta lain.')
      return
    }

    if (editId) {
      setPeserta(
        peserta.map((item) =>
          item.id === editId
            ? { ...item, nama, nim, kelas }
            : item
        )
      )
    } else {
      const pesertaBaru = {
        id: `m-${Date.now()}`,
        nama,
        nim,
        kelas,
        hadir: false,
      }

      setPeserta([...peserta, pesertaBaru])
    }

    kosongkanForm()
  }

  function handleEdit(item) {
    setEditId(item.id)
    setForm({
      nama: item.nama,
      nim: item.nim,
      kelas: item.kelas,
    })
    setPesan('')
  }

  function handleHapus(id) {
    setPeserta((dataLama) =>
      dataLama.filter((item) => item.id !== id)
    )

    if (editId === id) {
      kosongkanForm()
    }
  }

  function handleToggleHadir(id) {
    setPeserta((dataLama) =>
      dataLama.map((item) =>
        item.id === id
          ? { ...item, hadir: !item.hadir }
          : item
      )
    )
  }

  const totalPeserta = peserta.length

  const jumlahHadir = peserta.filter(
    (item) => item.hadir
  ).length

  const jumlahBelumHadir = peserta.filter(
    (item) => !item.hadir
  ).length

  const kataKunci = pencarian.trim().toLowerCase()
  
  const pesertaTerfilter = peserta.filter((item) => {
    const cocokPencarian =
    item.nama.toLowerCase().includes(kataKunci) ||
    item.nim.includes(kataKunci)

    const cocokKelas =
    filterKelas === '' || item.kelas === filterKelas

    return cocokPencarian && cocokKelas
  })

  return (
    <div>
      <h1>Manajemen Peserta Praktikum</h1>

      <RingkasanPeserta
        totalPeserta={totalPeserta}
        jumlahHadir={jumlahHadir}
        jumlahBelumHadir={jumlahBelumHadir}
        hasilDitampilkan={pesertaTerfilter.length}
      />

      <FormPeserta
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editId={editId}
        onBatal={kosongkanForm}
        pesan={pesan}
      />

      <FilterPeserta
      pencarian={pencarian}
      setPencarian={setPencarian}
      filterKelas={filterKelas}
      setFilterKelas={setFilterKelas}
      />
      
      <DaftarPeserta
      peserta={pesertaTerfilter}
      totalPeserta={totalPeserta}
      onEdit={handleEdit}
      onHapus={handleHapus}
      onToggleHadir={handleToggleHadir}
      />
    </div>
  )
}

export default App