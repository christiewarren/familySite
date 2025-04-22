import React from 'react'
import people from "../data/peopleData.json"
import PeopleList from './PeopleList'


export default function Tree(props){

    const treeLinks = people.map((person) => {

        return(
            <div>
                <PeopleList
                    title='spouse' 
                    contents={[person.spouse]}
                    isInModal={false}
                />
                <PeopleList
                    title='children' 
                    contents={person.children}
                    isInModal={false}
                />
                <PeopleList
                    title='parents' 
                    contents={person.parents}
                    isInModal={false}
                />
                <PeopleList
                    title='siblings' 
                    contents={person.siblings}
                    isInModal={false}
                />
            </div>
        )

    })

    return(
            <div>
                {treeLinks}
                <p>tree</p>
            </div>
    )
}