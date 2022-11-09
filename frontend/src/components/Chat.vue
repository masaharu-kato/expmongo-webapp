<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" style="height:80vh">
        <v-toolbar color="#BBDEFB" light>
          <v-toolbar-title>Welcome ChatApp</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="deleteRecord">Delete Old Chat</v-btn>
        </v-toolbar>
        <!-- v-card内チャットをスクロールさせるためにclass="overflow-y-auto"を指定 -->
        <v-card height="90%" width="100%" class="overflow-y-auto">
          <!-- チャットの表示 -->
          <v-list two-line subheader>
            <v-list-item v-for="(message,index) in messages" :key="index">
              <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="message.username"></v-list-item-title>
                <v-list-item-subtitle v-text="message.content"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="message.datetime"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset v-if="messages.length > 0"></v-divider>
          </v-list>
        </v-card>
        <v-card height="10%" width="100%" color="#B2DFDB" class="pa-sm-3 pa-lg-3 pa-md-4">
          <v-text-field
            v-model="message"
            solo
            clearable
            append-outer-icon="mdi-send"
            @click:append-outer="sendMessage"
            @keyup.enter="sendMessage"
          ></v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
  name: "ChatHome",
  data: () => ({
    message: "",
    messages: [],
    userId: "",
    socket: "",
  }),
  methods: {
    
    //チャットを投稿する処理
    async sendMessage() {
      this.username = this.$store.state.username;
      try {
        const result = await axios.post("http://localhost:3000/api/message", {
          username: this.username,
          content: this.message,
        });
        if (result.data.status != 'OK') throw new Error();
        this.message = '';
        {
          const result = await axios.get("http://localhost:3000/api/messages");
          this.messages = result.data;
        }
      } catch {
        alert("削除に失敗しました。");
      }
    },

    // 投稿したチャットの削除
    async deleteRecord() {
      try {
        const result = await axios.delete("http://localhost:3000/api/messages");
        if (result.data.status != 'OK') throw new Error();
        this.messages = [];
      } catch {
        alert("削除に失敗しました。");
      }
    },

  },

  async mounted() {

    // 初期表示時にDBのレコードを取得する
    try {
      const result = await axios.get("http://localhost:3000/api/messages");
      this.messages = result.data;
    } catch {
      alert("処理に失敗しました。");
    }

  },
  
};
</script>

<style scoped>
/* CSSでv-list-itemを指定する場合、下記の指定の仕方ができる。 */
.v-list-item__content {
  text-align: left;
}
</style>
