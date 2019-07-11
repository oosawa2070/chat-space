##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,|
|email|string|null: false,|
|password|string|null: false|
### Association
- has_many  :messarge
- has_many  :groups, through: :members

##messargeテーブル
|Column|Type|Options|
|------|----|-------|
|body|string|null: false,|
|image|string|null: false,|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :groups

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name||string|null: false|
### Association
- has_many   :messarge
- has_many   :users, through: :members
