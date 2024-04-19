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

  public clearCountMessage(): void {
    const userArr = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];
    const user = this.getUserToSend();
    const userSearch = userArr.find(
      (el) =>
        (el.children[1].getAttribute('data-login') &&
          el.children[1].getAttribute('data-login') === user) ||
        el.children[1].textContent === user,
    );
    const count = userSearch?.querySelector('.user__count-message') as HTMLDivElement;

    count.innerHTML = ``;
    count.classList.remove('unread');
  }

  public clearInputMessage(): void {
    const content = document.querySelector('.wrapper__message-input') as HTMLInputElement;

    content.value = ``;
    content.removeAttribute('data-id');
  }

  public getSearchUser(): string {
    const input = document.querySelector('.users__search') as HTMLInputElement;

    return input.value;
  }

  public getUsers(): (string | null)[] {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    return users.map((el) => {
      const att = el.getAttribute('data-login');

      return att || el.textContent;
    });
  }

  public showUsers(arr: (string | null)[]): void {
    const users = Array.from(document.querySelectorAll('.user__name')) as HTMLParagraphElement[];

    users.forEach((el) => {
      const att = el.getAttribute('data-login');

      if (arr.includes(att || el.textContent)) {
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

  public checkMessage(): boolean {
    const message = document.querySelector('.message') as HTMLElement;

    return !!message;
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
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;
    const user = document.querySelector('.header__name-user') as HTMLParagraphElement;
    const massageInput = document.querySelector('.wrapper__message-input') as HTMLInputElement;

    user.textContent = name;
    fieldMessage.classList.add('start');
    massageInput.removeAttribute('disabled');
    fieldMessage.textContent = `Write your first message...`;
    this.updateStatus(status);

    if (nameFull) {
      user.setAttribute('data-login', nameFull);
      user.setAttribute('title', nameFull);
    } else {
      user.removeAttribute('data-login');
      user.removeAttribute('title');
    }
  }

  public getMessageValue(): string {
    const message = document.querySelector('.wrapper__message-input') as HTMLInputElement;

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

  public checkCountMessages(): void {
    const messages = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    if (
      messages.length === 0 &&
      fieldMessage.textContent !== 'Select a user to send a message...'
    ) {
      fieldMessage.classList.add('start');
      fieldMessage.textContent = `Write your first message...`;
    }
  }

  public checkIdMessages(id: string): boolean {
    const message = document.querySelector(`.message[data-id="${id}"]`) as HTMLDivElement;

    return !!message;
  }

  public updateCountMessages(name: string, countMessage?: number): void {
    const users = Array.from(document.querySelectorAll('.content__user')) as HTMLDivElement[];

    users.forEach((el) => {
      const user = el.children[1];
      const att = user.getAttribute('data-login');

      if (att === name || user.textContent === name) {
        const count = el.lastElementChild;

        if (countMessage === -1) {
          count!.textContent = '';
          count?.classList.remove('unread');
        } else {
          count!.textContent =
            countMessage === undefined ? `${Number(count!.textContent) + 1}` : String(countMessage);
          count?.classList.add('unread');
        }
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

  public clearStrip(): void {
    const strip = document.querySelector('.strip') as HTMLDivElement;

    if (this.checkDividingStrip()) {
      strip.remove();
    }
  }

  public toggleAttMessages(bool: boolean): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    if (bool) {
      fieldMessage.setAttribute('data-scroll', 'true');
    } else {
      fieldMessage.setAttribute('data-scroll', 'false');
    }
  }

  public checkAttMessages(): string {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    return fieldMessage.getAttribute('data-scroll') || 'false';
  }

  public updateMessageScrolling(): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    if (this.checkDividingStrip()) {
      const strip = document.querySelector('.strip') as HTMLDivElement;
      const scroll = Number(strip.offsetTop) - Number(strip.offsetHeight) * 2;

      fieldMessage.scrollTop = scroll;
    } else {
      fieldMessage.scrollTop = -1;
    }
  }

  public addMessage(
    name: string,
    text: string,
    time: string,
    id: string,
    status: {
      isDelivered: boolean;
      isReaded: boolean;
      isEdited: boolean;
    },
  ): void {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;

    const newMessage = new Message(messagesParams, name, text, time, status);
    const element = newMessage.message.getElement()!;
    const sendName = element.querySelector('.header__message-sender') as HTMLParagraphElement;

    if (sendName.textContent!.length > 10) {
      sendName.setAttribute('data-login', name);
      sendName.setAttribute('title', name);
      sendName.textContent = `${name.slice(0, 10)}...`;
    } else {
      sendName.removeAttribute('data-login');
      sendName.removeAttribute('title');
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
    const input = document.querySelector('.wrapper__message-input') as HTMLInputElement;

    headerName.innerHTML = '';
    headerStatus.innerHTML = '';

    headerName.removeAttribute('data-login');
    headerName.removeAttribute('title');
    this.clearFieldMessagesLogout();
    this.activeButtonSendMessage(false);
    this.clearInputMessage();
    input.setAttribute('disabled', 'true');
  }

  public updateSentMessage(id: string, delivered: boolean): void {
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const message = messageArr.find((el) => el.getAttribute('data-id') === id);
    const status = message?.querySelector('.footer__message-status');

    if (status && delivered && message?.classList.contains('right')) {
      status.textContent = 'delivered';
    }
  }

  public updateReadedMessage(id: string, readed: boolean): void {
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const message = messageArr.find((el) => el.getAttribute('data-id') === id);
    const status = message?.querySelector('.footer__message-status');

    if (status && readed && message?.classList.contains('right')) {
      status.textContent = 'readed';
    }
  }

  public getIdMessagesDelivered(): (string | null)[] {
    const fieldMessage = document.querySelector('.messages__main') as HTMLDivElement;
    const index = Array.from(fieldMessage.children).findIndex(
      (el) => el.children[1].textContent === 'New message',
    );
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const messageDelivered = messageArr.filter(
      (el) => el.children[2].children[1].textContent === '',
    );
    const arrSlice = messageDelivered.slice(0, index);

    return arrSlice.map((el) => el.getAttribute('data-id'));
  }

  public overBlockActionMessage(x: number, y: number): void {
    const field = document.querySelector('.interaction__messages') as HTMLElement;
    const actionBlock = document.querySelector('.action') as HTMLElement;

    if (actionBlock.classList.contains('display-none')) {
      const coordLeft = field.getBoundingClientRect().left;
      const coordTop = field.getBoundingClientRect().top;
      const coordRight = field.getBoundingClientRect().right;
      const coordBottom = field.getBoundingClientRect().bottom;
      const height = 50;
      const width = 100;

      if (x < coordRight - width && y < coordBottom - height - 45) {
        actionBlock.style.transform = `translate(${x - coordLeft}px, ${y - coordTop}px)`;
      } else if (y > coordBottom - height - 45 && x > coordRight - width) {
        actionBlock.style.transform = `translate(${x - coordLeft - width}px, ${y - coordTop - height}px)`;
      } else if (y < coordBottom - height && x > coordRight - width) {
        actionBlock.style.transform = `translate(${x - coordLeft - width}px, ${y - coordTop}px)`;
      } else if (y > coordBottom - height - 45 && x < coordRight - width) {
        actionBlock.style.transform = `translate(${x - coordLeft - width}px, ${y - coordTop - height}px)`;
      }
    }
  }

  public showActionMessage(bool: boolean): void {
    const actionBlock = document.querySelector('.action') as HTMLElement;

    if (bool) {
      actionBlock.classList.remove('display-none');
    } else {
      actionBlock.classList.add('display-none');
      this.selectMessage('s');
    }
  }

  public writeIdActionMessage(id: string): void {
    const actionBlock = document.querySelector('.action') as HTMLElement;

    if (id) {
      actionBlock.setAttribute('data-id', id);
    } else {
      actionBlock.removeAttribute('data-id');
    }
  }

  public getIdActionMessage(): string | null {
    const actionBlock = document.querySelector('.action') as HTMLElement;

    return actionBlock.getAttribute('data-id');
  }

  public selectMessage(id: string): void {
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];

    messageArr.forEach((el) => {
      const att = el.getAttribute('data-id');

      if (att === id) {
        el.classList.add('select');
      } else {
        el.classList.remove('select');
      }
    });
  }

  public messageDelete(id: string): void {
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];

    messageArr.forEach((el) => {
      const att = el.getAttribute('data-id');

      if (att === id) {
        el.remove();
      }
    });
  }

  public addTextInInput(id: string): void {
    const input = document.querySelector('.wrapper__message-input') as HTMLInputElement;
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const message = messageArr.find((el) => el.getAttribute('data-id') === id);

    input.value = message!.children[1].textContent!;
    input.setAttribute('data-id', id);
    message?.classList.add('edit');

    this.showCancelEdit(true);
    this.activeButtonSendMessage(true);
  }

  public clearMessageEdit(): void {
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const message = messageArr.find((el) => el.classList.contains('edit'));

    message?.classList.remove('edit');
  }

  public showCancelEdit(bool: boolean): void {
    const button = document.querySelector('.wrapper__button') as HTMLElement;

    if (bool) {
      button.classList.remove('display-none');
    } else {
      button.classList.add('display-none');
    }
  }

  public getIdInput(): string | null {
    const input = document.querySelector('.wrapper__message-input') as HTMLElement;

    return input.getAttribute('data-id');
  }

  public checkEdit(): boolean {
    const button = document.querySelector('.wrapper__button') as HTMLElement;

    return button.classList.contains('display-none');
  }

  public messageEdit(id: string, text: string): void {
    const messageArr = Array.from(document.querySelectorAll('.message')) as HTMLDivElement[];
    const message = messageArr.find((el) => el.getAttribute('data-id') === id);
    const edit = message?.querySelector('.footer__message-change') as HTMLParagraphElement;

    message!.children[1].textContent = text;
    edit.textContent = 'changed';
  }

  public selectUserClick(name: string): void {
    const userArr = Array.from(document.querySelectorAll('.user__name')) as HTMLDivElement[];
    const user = userArr.find((el) => el.textContent === name);
    const click = new Event('click');

    user!.dispatchEvent(click);
  }
}
