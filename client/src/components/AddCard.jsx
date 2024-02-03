import React from "react";

const AddCard = () => {
    return (
        <div
            className="mb-4">
                <form action="">
                    <div className="form-row">
                    <div className="form-group row">
                        <div className="col-md-4 mb-3">
                            <input type="text" className="form-control" placeholder="name" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <input className="form-control" type="text" placeholder="Set" />
                        </div>
                        <div className="col">
                            <select className="custom-select my-1 mr-sm-2" >
                            <option disabled>Power Level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col-md-4 offset-md-4">
    <div className="text-center">
        <button className="btn btn-primary btn-block">Add</button>
    </div>
</div>

                    </div>
                    </div>
                </form>
        </div>
    )
}

export default AddCard;