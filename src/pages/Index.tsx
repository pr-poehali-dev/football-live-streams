import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Алексей', text: 'Какой матч!', time: '19:42' },
    { id: 2, user: 'Мария', text: 'Невероятный гол! 🔥', time: '19:43' },
    { id: 3, user: 'Дмитрий', text: 'Форвард в огне сегодня', time: '19:44' },
  ]);

  const [newMatch, setNewMatch] = useState({
    league: '',
    team1: '',
    team2: '',
    score1: 0,
    score2: 0,
    time: '',
    viewers: '0'
  });

  const [liveMatches, setLiveMatches] = useState([
    {
      id: 1,
      league: 'Премьер-Лига',
      team1: 'Спартак',
      team2: 'Зенит',
      score1: 2,
      score2: 1,
      time: '67\'',
      live: true,
      viewers: '12.5K'
    },
    {
      id: 2,
      league: 'Лига Чемпионов',
      team1: 'Реал Мадрид',
      team2: 'Барселона',
      score1: 3,
      score2: 3,
      time: '82\'',
      live: true,
      viewers: '45.2K'
    },
    {
      id: 3,
      league: 'Бундеслига',
      team1: 'Бавария',
      team2: 'Боруссия',
      score1: 1,
      score2: 0,
      time: '45\'',
      live: true,
      viewers: '28.7K'
    },
  ]);

  const upcomingMatches = [
    { id: 4, league: 'Серия А', team1: 'Ювентус', team2: 'Милан', date: 'Сегодня', time: '22:00' },
    { id: 5, league: 'Ла Лига', team1: 'Атлетико', team2: 'Севилья', date: 'Завтра', time: '20:30' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        user: 'Вы',
        text: message,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMsg]);
      setMessage('');
    }
  };

  const handleAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const matchToAdd = {
      id: liveMatches.length + 1,
      league: newMatch.league,
      team1: newMatch.team1,
      team2: newMatch.team2,
      score1: newMatch.score1,
      score2: newMatch.score2,
      time: newMatch.time,
      live: true,
      viewers: newMatch.viewers || '0'
    };
    setLiveMatches([...liveMatches, matchToAdd]);
    setNewMatch({
      league: '',
      team1: '',
      team2: '',
      score1: 0,
      score2: 0,
      time: '',
      viewers: '0'
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Tv" size={32} className="text-primary animate-pulse-glow" />
              <h1 className="text-3xl font-heading tracking-wider text-foreground">ФУТБАЛЫ</h1>
            </div>
            
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`font-heading text-lg tracking-wide transition-colors ${
                  activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ГЛАВНАЯ
              </button>
              <button
                onClick={() => setActiveTab('broadcasts')}
                className={`font-heading text-lg tracking-wide transition-colors ${
                  activeTab === 'broadcasts' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ТРАНСЛЯЦИИ
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`font-heading text-lg tracking-wide transition-colors ${
                  activeTab === 'contacts' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                КОНТАКТЫ
              </button>
            </div>

            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <main className="container mx-auto px-4 py-8">
          <section className="mb-12 animate-fade-in">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8 md:p-12 border border-primary/30">
              <div className="relative z-10">
                <Badge className="mb-4 bg-primary text-primary-foreground font-heading text-sm tracking-wider">
                  ПРЯМОЙ ЭФИР
                </Badge>
                <h2 className="text-4xl md:text-6xl font-heading mb-4 text-foreground">
                  СМОТРИ ФУТБОЛ В РЕАЛЬНОМ ВРЕМЕНИ
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mb-6">
                  Все топовые матчи мировых лиг с онлайн-чатом и статистикой
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg tracking-wide">
                  СМОТРЕТЬ СЕЙЧАС
                  <Icon name="Play" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-heading flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></span>
                  LIVE МАТЧИ
                </h3>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-heading">
                    {liveMatches.length} В ЭФИРЕ
                  </Badge>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 font-heading">
                        <Icon name="Plus" size={18} className="mr-2" />
                        ДОБАВИТЬ МАТЧ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-heading text-2xl">НОВАЯ ТРАНСЛЯЦИЯ</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMatch} className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="league" className="font-heading text-sm">Лига</Label>
                          <Input
                            id="league"
                            placeholder="Премьер-Лига"
                            value={newMatch.league}
                            onChange={(e) => setNewMatch({...newMatch, league: e.target.value})}
                            className="bg-input border-border mt-1"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="team1" className="font-heading text-sm">Команда 1</Label>
                            <Input
                              id="team1"
                              placeholder="Спартак"
                              value={newMatch.team1}
                              onChange={(e) => setNewMatch({...newMatch, team1: e.target.value})}
                              className="bg-input border-border mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="team2" className="font-heading text-sm">Команда 2</Label>
                            <Input
                              id="team2"
                              placeholder="Зенит"
                              value={newMatch.team2}
                              onChange={(e) => setNewMatch({...newMatch, team2: e.target.value})}
                              className="bg-input border-border mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="score1" className="font-heading text-sm">Счёт 1</Label>
                            <Input
                              id="score1"
                              type="number"
                              min="0"
                              value={newMatch.score1}
                              onChange={(e) => setNewMatch({...newMatch, score1: parseInt(e.target.value) || 0})}
                              className="bg-input border-border mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="score2" className="font-heading text-sm">Счёт 2</Label>
                            <Input
                              id="score2"
                              type="number"
                              min="0"
                              value={newMatch.score2}
                              onChange={(e) => setNewMatch({...newMatch, score2: parseInt(e.target.value) || 0})}
                              className="bg-input border-border mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="time" className="font-heading text-sm">Время</Label>
                            <Input
                              id="time"
                              placeholder="45'"
                              value={newMatch.time}
                              onChange={(e) => setNewMatch({...newMatch, time: e.target.value})}
                              className="bg-input border-border mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="viewers" className="font-heading text-sm">Зрители</Label>
                            <Input
                              id="viewers"
                              placeholder="1.2K"
                              value={newMatch.viewers}
                              onChange={(e) => setNewMatch({...newMatch, viewers: e.target.value})}
                              className="bg-input border-border mt-1"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-heading text-lg">
                          <Icon name="Plus" size={18} className="mr-2" />
                          ДОБАВИТЬ ТРАНСЛЯЦИЮ
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-4 animate-slide-up">
                {liveMatches.map((match, index) => (
                  <Card
                    key={match.id}
                    className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs font-heading">
                        {match.league}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Icon name="Eye" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{match.viewers}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-lg">{match.team1}</span>
                          <span className="text-3xl font-heading text-primary">{match.score1}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-lg">{match.team2}</span>
                          <span className="text-3xl font-heading text-primary">{match.score2}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <Badge className="bg-primary/20 text-primary font-heading">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {match.time}
                      </Badge>
                      <Button size="sm" className="font-heading">
                        СМОТРЕТЬ
                        <Icon name="ChevronRight" size={16} className="ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-3xl font-heading mb-6">БЛИЖАЙШИЕ ТРАНСЛЯЦИИ</h3>
                <div className="space-y-3">
                  {upcomingMatches.map((match) => (
                    <Card key={match.id} className="p-4 bg-card/50 border-border hover:bg-card transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-2">{match.league}</Badge>
                          <div className="font-medium">{match.team1} - {match.team2}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{match.date}</div>
                          <div className="font-heading text-lg text-primary">{match.time}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading">LIVE ЧАТ</h3>
                  <Badge variant="outline" className="animate-pulse-glow">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    ОНЛАЙН
                  </Badge>
                </div>

                <ScrollArea className="h-[400px] mb-4 pr-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="animate-fade-in">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-medium text-sm text-primary">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm bg-secondary/50 rounded-lg px-3 py-2">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    placeholder="Напишите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-input border-border"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center">
                    <Icon name="Users" size={14} className="inline mr-1" />
                    1,247 зрителей в чате
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      )}

      {activeTab === 'broadcasts' && (
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-heading mb-8">ВСЕ ТРАНСЛЯЦИИ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...liveMatches, ...liveMatches].map((match, idx) => (
              <Card key={idx} className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer hover:scale-105">
                <Badge variant="secondary" className="mb-3 font-heading">{match.league}</Badge>
                <div className="text-center mb-4">
                  <div className="font-medium text-xl mb-2">{match.team1}</div>
                  <div className="text-4xl font-heading text-primary my-3">
                    {match.score1} : {match.score2}
                  </div>
                  <div className="font-medium text-xl">{match.team2}</div>
                </div>
                <Badge className="w-full justify-center bg-primary/20 text-primary font-heading">
                  {match.time} • {match.viewers} зрителей
                </Badge>
              </Card>
            ))}
          </div>
        </main>
      )}

      {activeTab === 'contacts' && (
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-heading mb-8">КОНТАКТЫ</h2>
            <Card className="p-8 bg-card border-border">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-4 rounded-lg">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-lg">Email</div>
                    <div className="text-muted-foreground">support@futbaly.tv</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-4 rounded-lg">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-lg">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-4 rounded-lg">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-lg">Telegram</div>
                    <div className="text-muted-foreground">@futbaly_support</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-heading text-2xl mb-4">НАПИШИТЕ НАМ</h3>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" className="bg-input border-border" />
                    <Input placeholder="Email" type="email" className="bg-input border-border" />
                    <textarea
                      placeholder="Сообщение"
                      rows={4}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button className="w-full bg-primary hover:bg-primary/90 font-heading text-lg">
                      ОТПРАВИТЬ
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </main>
      )}

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-heading text-lg tracking-wide">ФУТБАЛЫ © 2024</p>
          <p className="text-sm mt-2">Все матчи в одном месте</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;