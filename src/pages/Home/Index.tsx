import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Social } from "../../components/Social/Index";
import { db } from "../../services/firebaseConnection";
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from "firebase/firestore"
import { useEffect, useState } from "react";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebook: string;
    youtube: string;
    instagram: string;
}

export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"));

            getDocs(queryRef)
               .then((snapshot) => {
                    let lista = [] as LinkProps[];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color,
                        })
                    })

                    setLinks(lista);
                })
        }
        loadLinks();
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link");
            getDoc(docRef)
                .then((snapshot) => {
                    if(snapshot.data() !== undefined) {
                        setSocialLinks({
                            facebook: snapshot.data()?.facebook,
                            youtube: snapshot.data()?.youtube,
                            instagram: snapshot.data()?.instagram,
                        })
                    }
                })
        }
        loadSocialLinks();
    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Erick Berdnaski</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links👇🏼</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link) => (
                <section 
                    style={{ backgroundColor: link.bg}}
                    key={link.id} 
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a href={link.url} target="_blank">
                        <p className="text-base md:text-lg" style={{ color: link.color }}>
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}

                { socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook size={35} color="#FFF" />
                        </Social>
    
                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={35} color="#FFF" />
                        </Social>
    
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#FFF" />
                        </Social>
                    </footer>
                )}
            </main>
        </div>
    )
}