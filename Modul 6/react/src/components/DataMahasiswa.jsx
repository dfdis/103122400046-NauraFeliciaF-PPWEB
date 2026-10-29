import React from 'react';
import CardMahasiswa from './CardMahasiswa';

function DataMahasiswa() {
    const mahasiswa = [
        { id: 1, nama: 'Dokja', nim: '123456789' },
        { id: 2, nama: 'Araa', nim: '987654321' },
        { id: 3, nama: 'cia', nim: '123456789' },
        { id: 4, nama: 'yjh', nim: '987654321' },
    ];

    return (
        <div>
            {mahasiswa.map((mhs) => (
                <CardMahasiswa key={mhs.id} nama={mhs.nama} nim={mhs.nim} />
            ))}
        </div>
    );
};

export default DataMahasiswa;