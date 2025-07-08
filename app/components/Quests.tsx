"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function Quests() {
    const [pesel, setPesel] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [fatherName, setFatherName] = useState<string>("");
    const [motherName, setMotherName] = useState<string>("");
    const [motherMaidenName, setMotherMaidenName] = useState<string>("");
    const [birthPlace, setBirthPlace] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [nationality, setNationality] = useState<string>("");
    const [registrationDate, setRegistrationDate] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);

    const generatePesel = (date: string, gender: string) => {
        if (!date || !gender) return "";
        
        const birth = new Date(date);
        const year = birth.getFullYear();
        const month = birth.getMonth() + 1;
        const day = birth.getDate();
        
        // Format daty dla PESEL
        const yearStr = year.toString().slice(-2);
        const monthStr = month < 10 ? `0${month}` : month.toString();
        const dayStr = day < 10 ? `0${day}` : day.toString();
        
        // Generuj losowe 3 cyfry (numer seryjny)
        const serialNumber = Math.floor(Math.random() * 900) + 100;
        
        // Ostatnia cyfra - parzysta dla kobiet, nieparzysta dla mężczyzn
        const genderDigit = gender === "female" ? 
            Math.floor(Math.random() * 5) * 2 : // 0,2,4,6,8
            Math.floor(Math.random() * 5) * 2 + 1; // 1,3,5,7,9
        
        // Składanie pierwszych 10 cyfr
        const firstTen = yearStr + monthStr + dayStr + serialNumber.toString() + genderDigit.toString();
        
        // Obliczanie cyfry kontrolnej
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(firstTen[i]) * weights[i];
        }
        const controlDigit = (10 - (sum % 10)) % 10;
        
        return firstTen + controlDigit.toString();
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(pesel);
        } catch (err) {
            console.error('Nie udało się skopiować: ', err);
        }
    };

    // Aktualizuj PESEL gdy zmieni się data lub płeć
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setBirthDate(newDate);
        const newPesel = generatePesel(newDate, gender);
        setPesel(newPesel);
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGender = e.target.value;
        setGender(newGender);
        const newPesel = generatePesel(birthDate, newGender);
        setPesel(newPesel);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    };

    const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFatherName(e.target.value);
    };

    const handleMotherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMotherName(e.target.value);
    };

    const handleMotherMaidenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMotherMaidenName(e.target.value);
    };

    const handleBirthPlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthPlace(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(e.target.value);
    };

    const handleNationalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNationality(e.target.value);
    };

    const handleRegistrationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationDate(e.target.value);
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreet(e.target.value);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert("Formularz został wysłany!");
    }
    return (
        <form action="">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6 max-w-[700px]">
            <div className="flex items-center justify-around">
                <label htmlFor="name" className="font-bold">Imie: </label>
                <input 
                    type="text" 
                    name="name" 
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                /> 
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="surname" className="font-bold">Nazwisko: </label>
                <input 
                    type="text" 
                    name="surname" 
                    value={surname}
                    onChange={handleSurnameChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                /> 
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="birthdate" className="font-bold">Data urodzenia: </label>
                <input 
                    type="date" 
                    name="birthdate" 
                    value={birthDate}
                    onChange={handleDateChange}
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="gender" className="font-bold">Płeć: </label>
                <select 
                    name="gender" 
                    value={gender}
                    onChange={handleGenderChange}
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 text-white"
                >
                    <option value="">Wybierz płeć</option>
                    <option value="male" className="text-black">Mężczyzna</option>
                    <option value="female" className="text-black">Kobieta</option>
                </select>
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="fatherName" className="font-bold">Imię ojca: </label>
                <input 
                    type="text" 
                    name="fatherName" 
                    value={fatherName}
                    onChange={handleFatherNameChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="motherName" className="font-bold">Imię matki: </label>
                <input 
                    type="text" 
                    name="motherName" 
                    value={motherName}
                    onChange={handleMotherNameChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="motherMaidenName" className="font-bold">Nazwisko rodowe matki: </label>
                <input 
                    type="text" 
                    name="motherMaidenName" 
                    value={motherMaidenName}
                    onChange={handleMotherMaidenNameChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="birthPlace" className="font-bold">Miasto urodzenia: </label>
                <input 
                    type="text" 
                    name="birthPlace" 
                    value={birthPlace}
                    onChange={handleBirthPlaceChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="city" className="font-bold">Miasto zamieszkania: </label>
                <input 
                    type="text" 
                    name="city" 
                    value={city}
                    onChange={handleCityChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="postalCode" className="font-bold">Kod pocztowy: </label>
                <input 
                    type="text" 
                    name="postalCode" 
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 " 
                    placeholder="np. 68-200"
                />
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="nationality" className="font-bold">Obywatelstwo: </label>
                <input 
                    placeholder="np. Polskie" 
                    type="text" 
                    name="nationality" 
                    value={nationality}
                    onChange={handleNationalityChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                /> 
            </div>
            <div className="flex items-center justify-around">
                <label htmlFor="registrationDate" className="font-bold">Data zameldowania na pobyt stały: </label>
                <input 
                    type="date" 
                    name="registrationDate" 
                    value={registrationDate}
                    onChange={handleRegistrationDateChange}
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <hr className="md:col-span-2 text-gray-500 ml-5 mr-5"/>
            <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-around">
                <label htmlFor="code" className="font-bold">Kod miejscowości/powiatu (np. FZA dla Żar): </label>
                <input 
                    type="text" 
                    name="code" 
                    value={code}
                    onChange={handleCodeChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 "
                />
            </div>
            <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-around">
                <label htmlFor="street" className="font-bold">Adres zameldowania na pobyt stały - ulica i numer: </label>
                <input 
                    type="text" 
                    name="street" 
                    value={street}
                    onChange={handleStreetChange}
                    autoComplete="off" 
                    className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 " 
                    placeholder="np. ul. Główna 15/3"
                />
            </div>
            <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-around">
                <label htmlFor="photo" className="font-bold">Twoje zdjęcie: </label>
                <div className="flex flex-col items-center">
                    <input 
                        type="file" 
                        name="photo" 
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {photo && (
                        <p className="text-sm text-gray-400 mt-2">
                            Wybrane zdjęcie: {photo.name}
                        </p>
                    )}
                </div>
            </div>
            <hr className="md:col-span-2 text-gray-500 ml-5 mr-5"/>
            <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-around">
                <label htmlFor="pesel" className="font-bold">Twój numer PESEL: </label>
                <div className="relative">
                    <input 
                        readOnly 
                        type="text" 
                        name="pesel" 
                        value={pesel}
                        autoComplete="off" 
                        className="bg-white/10 rounded-sm border-1 border-white/20 focus:outline-0 pr-10" 
                        placeholder="Wybierz datę urodzenia i płeć aby wygenerować PESEL"
                    />
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </div>
        </div>
            <hr className="text-gray-500 ml-5 mr-5 mt-6"/>
            <div className="flex items-center justify-center mt-6">
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                    onClick={(e)=>{handleSubmit(e);}}>
                    Wyślij formularz
                </button>
            </div>
        </form>
    )
}