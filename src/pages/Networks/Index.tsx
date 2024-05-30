import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header/Index";
import { Input } from "../../components/Input/Index";
import {
    setDoc,
    doc,
    getDoc
} from "firebase/firestore"
import { db } from "../../services/firebaseConnection";

export function Networks() {
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link");
            getDoc(docRef)
                .then((snapshot) => {
                    const data = snapshot.data();
                    if(data !== undefined) {
                        setFacebook(data?.facebook);
                        setInstagram(data?.instagram);
                        setYoutube(data?.youtube);
                    }
                })
                .catch((error) => {
                    console.log("Erro ao buscar dados" + error);
                })
        }
        loadLinks();
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
        })
        .then(() => {
            console.log("Dados salvos com sucesso")
        })
        .catch((error) => {
            console.log("Erro ao salvar" + error);
        })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minas redes sociais</h1>

            <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input 
                    placeholder="Digite a url do facebook..."
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input 
                    placeholder="Digite a url do instagram..."
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input 
                    placeholder="Digite a url do youtube..."
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                >
                    Salvar links
                </button>
            </form>
        </div>
    )
}