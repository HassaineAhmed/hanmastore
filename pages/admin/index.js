function Link({ link, text }) {
    return (
        <a href={`${link}`}>
            <div className="bg-[#ADE4DB] min-w-250 min-h-100 h-[150px]  rounded-xl px-4 hover:bg-formColor1 m-5 w-[200px] h-[200px] flex justify-center items-center "  >
                
                <span className="font-bebas_neue text-2xl" > {text} </span>
            </div>
        </a>
    )
}
export default function AdminPanelSettingsRounded() {
    return (<div className="">
        <span className="flex justify-center my-10 font-bold text-3xl" >Admin Page</span>
        <div className="grid items-center justify-center">
            <div className="flex">
                <Link link={"/admin/addField"} text={"add a field"} />
            </div>
            <div className="flex">
                <Link link={"/admin/addProductType"} text={"add a new product type"} />
                <Link link={"/admin/editProductType"} text={"edit a product type"} /></div>
            <div className="flex">
                <Link link={"/admin/addProductStock"} text={"add a new product stock"} />
                <Link link={"/admin/editProductStock"} text={"edit a product stock"} />
            </div>


        </div>
    </div>)
}
