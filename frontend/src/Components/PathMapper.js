import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import axios from 'axios';

export function PathMapper() {
    const [directory, setDirectory] = useState("");
    const [startMonitoring, setStartMonitoring] = useState(false);

    const history = useHistory();


    async function writeFiles() {
        try{
            const secure = await axios({method: 'post', url: "http://localhost:8000/hashwrite", data: {DirPath: directory}});
            console.log(secur8e);
        } catch (e) {
            console.error(e)
        }
        setStartMonitoring(true);
    }

    useEffect(()=> {
        if(startMonitoring){
            history.push(`/status?directory=${directory}`);
        }
    });


    return (
        <InputGroup className="mb-3">
            <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Enter directory path to be secured"
                value={directory}
                onChange={(e) => {
                    setDirectory(e.target.value)
                }}
            />
            <InputGroup.Append>
                <Button type="submit" className="mb-2" onClick={writeFiles}>
                    Submit
                </Button>
            </InputGroup.Append>
        </InputGroup>
    )
}
