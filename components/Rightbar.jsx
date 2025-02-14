import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from './ui/button'
import { Input } from './ui/input'



const games = [
    {
        homeTeam:'Real Madrid',
        homeOdd:1.80,
        awayTeam:'Man City',
        awayOdd:2.40
    }, {
        homeTeam:'Barcelona',
        homeOdd:1.80,
        awayTeam:'Arsenal',
        awayOdd:2.40
    },
]

const Rightbar = () => {
  return (
    // <div className="bg-yellow-400 mr-16 p-3 w-[280px]  items-center content-center justify-center">
    <Tabs defaultValue="account" className="flex flex-col ml-16 p-2 w-[250px] items-center justify-center bg-yellow-400 ">
        <TabsList>
            <TabsTrigger value="betslip" className="bg-none">Betslip</TabsTrigger>
            <TabsTrigger value="cashout" className={'w-[120px]'}>Cashout</TabsTrigger>
        </TabsList>
        <div className='flex bg-white w-[245px] justify-center items-center '>
        <TabsContent value="betslip"  className={'w-[220px]'}>
            <div className='flex flex-col gap-3'>

                <div>
                    {games.map((game)=>{
                       return (
                        <div className='flex gap-2 border-b-2'>
                            <div key={game} className='flex flex-col items-center'>
                            <p>{game.homeTeam}</p>
                            <p>{game.homeOdd}</p>
                            </div>
                              <p>vs</p>
                            <div  className='flex flex-col items-center'>
                            <p>{game.awayTeam}</p>
                            <p>P{game.awayOdd}</p>
                            </div>
                       </div>
                        )
                    })}
                </div>
                <div className='flex justify-between'>
                    <p>Total Stake</p>
                    <div>
                    <Input className={'w-[100px] h-[20px]'}/>
                    </div>
                  
                </div>
                <div  className='flex justify-between'>
                    <p>Potential Win</p>
                    <p>100000.00</p>
                </div>
                <div>
                    <Button variant="yellow"   className={'w-[230px] hover:bg-yellow-300 text-white'}>Place Bet</Button>
                </div>
                <div  className='flex justify-between'>
                    <p>Total Stake</p>
                    <p>1000.00</p>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="cashout"  className={'w-[220px]'}>Change your password here.</TabsContent>
        </div>
    </Tabs>

    // </div>
  )
}

export default Rightbar
