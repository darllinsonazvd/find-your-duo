import { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import GameBanner from './components/GameBanner';
import CreateAdsBanner from './components/CreateAdBanner';
import Input from './components/Form/Input';

import logo from './assets/logo-nlw-esports.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto my-8 flex flex-col items-center">
      <img src={logo} alt="" width="200px" />

      <h1 className="mt-8 text-4xl text-white font-black">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-10">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdsBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <form className="flex flex-col gap-4 mt-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Input id="game" placeholder="Selecione o game que deseja jogar" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Domingo">
                      D
                    </button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Segunda">
                      S
                    </button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Terça">
                      T
                    </button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Quarta">
                      Q
                    </button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Quinta">
                      Q
                    </button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Sexta">
                      S
                    </button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Sábado">
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hoursStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hoursStart" type="time" placeholder="De" />
                    <Input id="hoursEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-2 text-sm">
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="flex justify-end mt-4 gap-4">
                <Dialog.Close
                  type="button"
                  className="px-5 h-12 rounded-md font-semibold bg-zinc-500 hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  className="flex items-center gap-3 px-5 h-12 rounded-md font-semibold bg-violet-500 hover:bg-violet-600"
                  type="submit"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
