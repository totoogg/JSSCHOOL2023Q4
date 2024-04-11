import DividingStrip from '../mainPage/mainMessage/message/dividingStrip/dividingStrip';
import Message from '../mainPage/mainMessage/message/message';
import { messageStripParams, messagesParams } from './params';

export default class ManipulationMainUsers {
  public activeButtonSendMessage(bool: boolean): void {
    const massageButton = document.querySelector('.footer__message-button') as HTMLButtonElement;

    if (bool) {
      massageButton.classList.remove('disable');
    } else {
      massageButton.classList.add('disable');
    }
  }

  public clearUsers(): void {
    const content = document.querySelector('.users__content') as HTMLDivElement;

    content.innerHTML = ``;
  }

  public clearInputMessage(): void {
    const content = document.querySelector('.footer__message-input') as HTMLInputElement;

    content.value = ``;
  }

  public getSearchUser(): string {
    const input = document.querySelector('.users__search') as HTMLInputElement;

    return input.value;
  }

  public getUsers(): (string | null)[] {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    return users.map((el) => el.textContent);
  }

  public showUsers(arr: (string | null)[]): void {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    users.forEach((el) => {
      if (arr.includes(el.textContent)) {
        el.parentElement!.classList.remove('display-none');
      } else {
        el.parentElement!.classList.add('display-none');
      }
    });
  }

  public checkUser(login: string): boolean {
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];
    let result = false;

    users.forEach((el) => {
      const name = el.children[1];
      const att = name.getAttribute('data-login');
      if ((att && att === login) || name.textContent === login) {
        result = true;
      }
    });

    return result;
  }

  public updateStatusUser(login: string): void {
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];

    users.forEach((el) => {
      const name = el.children[1];
      const att = name.getAttribute('data-login');
      if ((att && att === login) || name.textContent === login) {
        el.children[0].classList.add('online');
        el.children[0].classList.remove('offline');
      }
    });
  }

  public sortUsers(): void {
    const block = document.querySelector('.users__content') as HTMLDivElement;
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];

    users.forEach((el) => {
      const clone = el.cloneNode(true);

      if (el.children[0].classList.contains('online')) {
        block.prepend(clone);
      } else {
        block.append(clone);
      }

      el.remove();
    });
  }

  public changeUserStatusOffline(user: string): void {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    users.forEach((el) => {
      const att = el.getAttribute('data-login');

      if ((att && att === user) || el.textContent === user) {
        el.previousElementSibling!.classList.remove('online');
        el.previousElementSibling!.classList.add('offline');
      }
    });
  }

  public updateStatus(bool: boolean): void {
    const userStatus = document.querySelector('.header__status-user') as HTMLParagraphElement;

    if (bool) {
      userStatus.classList.remove('offline');
      userStatus.classList.add('online');
      userStatus.textContent = 'Online';
    } else {
      userStatus.classList.add('offline');
      userStatus.classList.remove('online');
      userStatus.textContent = 'Offline';
    }
  }

  public updateUserMessage(user: string, bool: boolean): void {
    const name = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const att = name.getAttribute('data-login');

    if ((att && att === user) || name.textContent === user) {
      this.updateStatus(bool);
    }
  }

  public selectUser(status: boolean, name: string, nameFull: string | null): void {
    const user = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const mainMessage = document.querySelector('.messages__main') as HTMLDivElement;
    const massageInput = document.querySelector('.footer__message-input') as HTMLInputElement;

    user.textContent = name;
    massageInput.removeAttribute('disabled');
    mainMessage.textContent = `Write your first message...`;
    this.updateStatus(status);

    if (nameFull) {
      user.setAttribute('data-login', nameFull);
    } else {
      user.removeAttribute('data-login');
    }
  }

  public getMessageValue(): string {
    const message = document.querySelector('.footer__message-input') as HTMLInputElement;

    return message.value;
  }

  public buttonSend(but: boolean): void {
    const button = document.querySelector('.footer__message-button') as HTMLButtonElement;

    if (but) {
      button.classList.remove('disable');
    } else {
      button.classList.add('disable');
    }
  }

  public checkButtonSend(): boolean {
    const button = document.querySelector('.footer__message-button') as HTMLButtonElement;

    return button.classList.contains('disable');
  }

  public getUserToSend(): string {
    const user = document.querySelector('.header__name-user') as HTMLButtonElement;
    const att = user.getAttribute('data-login');

    return att || user.textContent!;
  }

  public getUserFromSend(): string {
    const user = document.querySelector('.header__user') as HTMLButtonElement;
    const att = user.getAttribute('data-login');

    if (att) {
      return att;
    }

    return user.textContent!.slice(6);
  }

  public updateCountMessages(name: string, countMessage?: number): void {
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];

    users.forEach((el) => {
      const user = el.children[1];
      const att = user.getAttribute('data-login');

      if (att === name || user.textContent === name) {
        const count = el.lastElementChild;

        count!.textContent =
          countMessage === undefined ? `${Number(count!.textContent) + 1}` : String(countMessage);
        count?.classList.add('unread');
      }
    });
  }

  public addDividingStrip(): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;
    const strip = new DividingStrip(messageStripParams);
    const element = strip.strip.getElement()!;

    this.clearFieldMessages();

    fieldMessage.prepend(element);
  }

  public checkDividingStrip(): boolean {
    const strip = document.querySelector('.strip') as HTMLDivElement;

    return !!strip;
  }

  public updateMessageScrolling(): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    if (this.checkDividingStrip()) {
      const strip = document.querySelector('.strip') as HTMLDivElement;
      const scroll = Number(strip.offsetTop) - Number(fieldMessage.getBoundingClientRect().y);

      fieldMessage.scrollTop = scroll;
    } else {
      fieldMessage.scrollTop = 0;
    }
  }

  public addMessage(name: string, text: string, time: string, id: string): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;
    const newMessage = new Message(messagesParams, name, text, time);
    const element = newMessage.message.getElement()!;
    const sendName = element.querySelector('.header__message-sender') as HTMLParagraphElement;

    if (sendName.textContent!.length > 10) {
      sendName.setAttribute('data-login', name);
      sendName.textContent = `${name.slice(0, 10)}...`;
    } else {
      sendName.removeAttribute('data-login');
      sendName.textContent = name;
    }

    if (name === 'You') {
      element.classList.add('right');
    } else {
      element.classList.add('left');
    }

    element.setAttribute('data-id', id);

    this.clearFieldMessages();

    fieldMessage.prepend(element);
  }

  public clearFieldMessages(): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    if (
      fieldMessage.textContent === 'Write your first message...' ||
      fieldMessage.textContent === 'Select a user to send a message...'
    ) {
      fieldMessage.textContent = '';
      fieldMessage.classList.remove('start');
    }
  }

  public clearFieldMessagesLogout(): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    fieldMessage.innerHTML = '';
    fieldMessage.textContent = 'Select a user to send a message...';
    fieldMessage.classList.add('start');
  }

  public clearInteractionMessages(): void {
    const headerName = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const headerStatus = document.querySelector('.header__status-user') as HTMLParagraphElement;
    const input = document.querySelector('.footer__message-input') as HTMLInputElement;

    headerName.innerHTML = '';
    headerStatus.innerHTML = '';

    this.clearFieldMessagesLogout();
    this.activeButtonSendMessage(false);
    this.clearInputMessage();
    input.setAttribute('disabled', 'true');
  }
}
