import React, { CSSProperties } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

// interfaceよりtypeの方が定義できる型が多い
// type SidebarProps = {
//   drawerWidth: number;
//   mobileOpen: boolean;
//   handleDrawerTransitionEnd: () => void;
//   handleDrawerClose: () => void;
// };
// サイドバーに表示するItemの型定義
interface menuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

// サイドバーのコンポーネント
const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: SidebarProps) => {
  // メニューのリストを配列で定義
  // 型は上で定義したmenuItem
  const MenuItems: menuItem[] = [
    // text: メニューの表示名、path: リンク先、icon: アイコン
    { text: "Home", path: "/", icon: HomeIcon },
    { text: "Report", path: "/report", icon: EqualizerIcon },
  ];

  // 基準のリンクのスタイル
  const baseLinkStyle: CSSProperties = {
    textDecoration: "none", //下線を消す
    color: "inherit", //親要素の色を継承
    display: "block", //表示させるためblock
  };

  // アクティブなリンクのスタイル
  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.08)", //背景を透過
  };
  //サイドバーの中身
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/*上で定義したMenuItemsをmapメゾットで1回ずつ呼び出す*/}
        {/* itemは配列の要素,indexは配列の順番 */}
        {MenuItems.map((item, index) => (
          // react-router-domのNavLinkを使ってリンクを貼る
          <NavLink
            key={item.text} //keyは一意の値（ユニークな値）を指定する必要がある
            to={item.path}
            // リンクのスタイルを設定
            // isActiveはリンクが選択されたかどうかの状態=true
            style={({ isActive }) => {
              console.log("選択された値は", item.text, isActive);
              // styleプロパティはcssの要素を返す必要がある
              // inline styleの書き方はオブジェクトで書く
              return {
                // スプレット構文でオブジェクト内を全展開してるため
                //下と同じ意味になる
                // textDecoration: "none",
                // color: "inherit",
                // display: "block",
                ...baseLinkStyle,
                // isActiveがtrueの場合はactiveLinkStyleを追加
                // falseの場合は何も追加しない
                ...(isActive ? activeLinkStyle : {}),
              };
            }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {/* MUIのIconはコンポーネントの様に書く必要がある */}
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      {/* サイドバー */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* モバイル用 */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // レスポンシブデザインのブレイクポイントを指定
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* PC用 */}
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};

export default SideBar;
