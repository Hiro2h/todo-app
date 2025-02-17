# Test Cases for TODO Application

## Test Case 1: Dodawanie nowego zadania  
### Opis  
Użytkownik powinien mieć możliwość dodania nowego zadania do listy.  

### Warunki wstępne  
- Strona aplikacji https://wc-react-todo-app.netlify.app jest otwarta  

### Kroki  
1. Wciśnij niebieski przycisk "Add Task"
2. Uzupełnij pole tekstowe tytułem nowego zadania w okienku pop-up
3. Wybrany status pozostaw na "Incomplete" w okienku pop-up
4. Wciśnij niebieski przycisk "Add Task" w okienku pop-up

### Oczekiwane rezultaty  
- Nowe zadanie pojawia się na liście oraz
- Pojawia się mały alert o treści "Task added successfully"

---

## Test Case 2: Niepoprawne dane w polu tekstowym
### Opis 
Sprawdzenie, czy aplikacja poprawnie obsługuje nietypowe dane wejściowe.

### Warunki wstępne  
- Strona aplikacji https://wc-react-todo-app.netlify.app jest otwarta

### Kroki  
1. Wciśnij niebieski przycisk "Add Task"
2. Uzupełnij pole tekstowe następującym kodem HTML "<script>alert('ALERT!')</script>"
3. Wciśnij niebieski przycisk "Add Task" w okienku pop-up

### Oczekiwane rezultaty  
- Wprowadzony kod HTML jest traktowany jako zwykły tekst, a nie wykonywany jako kod
- Nowe zadanie pojawia się na liście oraz
- Pojawia się mały alert o treści "Task added successfully"

---

## Test Case 3: Edycja danych istniejącego zadania
### Opis  
Użytkownik powinien mieć możliwość edytowania danych w istniejącym już zadaniu.  

### Warunki wstępne  
- Strona aplikacji https://wc-react-todo-app.netlify.app jest otwarta
- Istnieje conajmniej jeden widoczny na liście zadań

### Kroki  
1. Wciśnij szary przycisk ołówka przy istniejącym zadaniu
2. Zmień treść tytułu w polu tekstowym na "GOTOWY1" w okienku pop-up
3. Wybierz inną opcję niż widoczna w drop-down menu o nazwie "Status" w okienku pop-up
4. Wciśnij niebieski przycisk "Update Task" w okienku pop-up

### Oczekiwane rezultaty  
- Na liście widnieje zadanie zatytułowane "GOTOWY1"
- Status tego zadania jest widoczny jako "Completed"
- Pojawia się mały alert o treści "Task Updated successfully"

---

## Test Case 4: Usunięcie istniejącego taska
### Opis  
Użytkownik powinien móc usunąć zadanie z listy.

### Warunki wstępne  
- Strona aplikacji https://wc-react-todo-app.netlify.app jest otwarta
- Istnieje conajmniej jeden widoczny na liście zadań

### Kroki  
1. Wciśnij szary przycisk kosza na śmieci przy istniejącym zadaniu

### Oczekiwane rezultaty  
- Zadanie przy którym wcisnięto przycisk kosza na śmieci znika z listy
- Pojawia się mały alert o treści "Todo Deleted Successfully"

---

## Test Case 5: Filtrowanie zadań
### Opis  
Użytkownik powinien móc przefiltrować listę, aby zobaczyć tylko aktywne lub ukończone zadania.

### Warunki wstępne  
- Strona aplikacji https://wc-react-todo-app.netlify.app jest otwarta
- Na liście istnieje conajmniej kilka zadań o różnych statusach

### Kroki  
1. W szarym drop-down menu po prawej stronie wybierz opcję "All"
2. W szarym drop-down menu po prawej stronie wybierz opcję "Incomplete"
3. W szarym drop-down menu po prawej stronie wybierz opcję "Completed"

### Oczekiwane rezultaty  
- Lista pokazuje wszystkie zadania po wybraniu opcji "All"
- Lista pokazuje tylko aktywne zadania po wybraniu opcji "Incomplete"
- Lista pokazuje tylko ukończone zadania po wybraniu opcji "Completed"

---

## Test Case 6: Wykorzystanie checkbox'a do zmiany statusu zadania
### Opis
Użytkownik powinien móc zmienić status zadania poprzez interakcję z checkbox'em przy jego tytule

### Warunki wstępne  
- Strona aplikacji https://wc-react-todo-app.netlify.app jest otwarta
- Istnieje conajmniej jeden stworzony i widoczny na liście task

### Kroki  
1. W wybranym nieukończonym zadaniu najedź myszką i wciśnij kwadrat przy tytule zadania
2. W tym samym zadaniu najedź myszką i wciśnij niebieski znaczek w kwadracie przy tytule zadania 

### Oczekiwane rezultaty  
- Przy pierwszej interakcji z checkbox'em status zadania zmienia się na "Completed"
- Przy następnej interakcji z tym samym checkbox'em, status zmienia się z powrotem na "Incomplete"