const Edit = () => {
    return (
        <div className="pt-10 h-screen">
            <h1 className="text-center">Kolekcja 1</h1>
            <div className="grid grid-cols-3 pl-10 gap-4 grid-rows-8 ">
                <p className="row-start-2 col-start-1">Właściciel:</p>
                <p className="row-start-2 col-start-2">login_właściciela</p>
                <p className="row-start-3 col-start-1">Uczestnicy:</p>
                <div className="row-start-3 col-start-2">
                    <p>login_uczestnika_1</p>
                    <p>login_uczestnika_2</p>
                </div>
            </div>
        </div>
    );
};

export default Edit;
