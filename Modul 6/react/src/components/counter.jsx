import React from 'react'
import { useState } from 'react';

const counter = () => {
    const [jumlah, setJumlah] = useState(0);

    return (
        <div>
            <p>Jumlah: {jumlah}</p>
            <button onClick={() => setJumlah(jumlah + 1)}>Tambah</button> 
        </div>
    )
}

export default counter
